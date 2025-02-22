import fs from 'node:fs';
import path from 'node:path';
import { createBareServer } from '@nebula-services/bare-server-node';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import basicAuth from 'express-basic-auth';
import mime from 'mime';
import fetch from 'node-fetch';
import config from '../../config.js';

// Create an express-like handler inside the function
const bareServer = createBareServer('/fq/');
const cache = new Map();
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // Cache for 30 Days

const handler = async (event, context) => {
  const { httpMethod, path } = event;
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: '',
  };

  if (config.challenge !== false) {
    console.log(chalk.green('🔒 Password protection is enabled! Listing logins below'));
    Object.entries(config.users).forEach(([username, password]) => {
      console.log(chalk.blue(`Username: ${username}, Password: ${password}`));
    });
  }

  // Match your routes here
  if (path.startsWith('/e/')) {
    try {
      if (cache.has(path)) {
        const { data, contentType, timestamp } = cache.get(path);
        if (Date.now() - timestamp > CACHE_TTL) {
          cache.delete(path);
        } else {
          response.body = data;
          response.headers['Content-Type'] = contentType;
          return response;
        }
      }

      const baseUrls = {
        '/e/1/': 'https://raw.githubusercontent.com/qrs/x/fixy/',
        '/e/2/': 'https://raw.githubusercontent.com/3v1/V5-Assets/main/',
        '/e/3/': 'https://raw.githubusercontent.com/3v1/V5-Retro/master/',
      };

      let reqTarget;
      for (const [prefix, baseUrl] of Object.entries(baseUrls)) {
        if (path.startsWith(prefix)) {
          reqTarget = baseUrl + path.slice(prefix.length);
          break;
        }
      }

      if (!reqTarget) {
        return response;
      }

      const asset = await fetch(reqTarget);
      if (!asset.ok) {
        return response;
      }

      const data = Buffer.from(await asset.arrayBuffer());
      const ext = path.extname(reqTarget);
      const no = ['.unityweb'];
      const contentType = no.includes(ext)
        ? 'application/octet-stream'
        : mime.getType(ext);

      cache.set(path, { data, contentType, timestamp: Date.now() });
      response.body = data;
      response.headers['Content-Type'] = contentType;
    } catch (error) {
      console.error('Error fetching asset:', error);
      response.statusCode = 500;
      response.body = 'Error fetching the asset';
    }
  }

  return response;
};

export { handler };

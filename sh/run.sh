#!/bin/bash

# Function to check if Node.js is installed
check_nodejs() {
    if command -v node &>/dev/null; then
        echo "Node.js is already installed."
    else
        echo "Node.js is not installed. Installing..."     
         sudo apt-get install -y nodejs
       
    fi
}

install_and_start() {
    echo "Installing dependencies..."
    npm install

    echo "Starting interstellar, when loaded please go to localhost:port"
    npm start
}

# Main function
main() {
    check_nodejs
    install_and_start
}

# Execute main function
main

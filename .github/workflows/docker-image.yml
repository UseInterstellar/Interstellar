name: Publish image to Docker Hub

on:
  [workflow_dispatch]

jobs:
  publish_image:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v3
      - name: build
        run: |
          docker build . -t ${{ secrets.DOCKERHUB_USERNAME}}/${{ secrets.DOCKERHUB_NAME}}:latest
      - name: publish
        run: |
          docker login -u ${{ secrets.DOCKERHUB_USERNAME}} -p ${{ secrets.DOCKERHUB_TOKEN}}
          docker push ${{ secrets.DOCKERHUB_USERNAME}}/${{ secrets.DOCKERHUB_NAME}}:latest

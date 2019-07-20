# Dockerfile for building vindax binaries.

Now, you can build your own vindax files on all systems with docker and do it easy without installing depends on your system.

## How:

### Build docker image

```
sudo docker build .
```

### Run docker container

Builder will return HASH of image
Example:
Successfully built 9bbff825d50f

```
sudo docker run -it -v ~/path/to/vindax/folder:/vindax 9bbff825d50f
```

If your system uses SELINUX you may use --privileged=true key

```
sudo docker run --privileged=true -it -v ~/development/vindax:/vindax 9bbff825d50f
```

See vindax-qt file in used vindax folder and vindaxd file in src subfolder.
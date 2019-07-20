'use strict';

var fs = require("fs");

function zeroFill(number, width) {
    width -= number.toString().length;
    if (width > 0) {
        return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + ""; // always return a string
}

function imagePath(path, name) {
    var path = path + '/image/' + name;
    return path.replace("//", "/"); // if _dirname is /, then we get //storage/1.png
};

function resourcePath(type, name) {
    return 'resource/' + type + '/' + name;
};

function isExistPath(path, callback) {
    fs.stat(path, function(err, stat) {
        if (err == null)
            return callback(true)
        if (err.code == 'ENOENT')
            return callback(false)
        callback(false)
    })
}

exports.uploadImg = function(req, res) {
    var dataPath = req.app.get('pathStorage');
    var fileName = req.body.fileName;

    var curDate = new Date();
    var parentFolder = zeroFill(curDate.getFullYear(), 4) + '_' + zeroFill(curDate.getMonth(), 2) + '_' + zeroFill(curDate.getDate(), 2);
    var parentPath = imagePath(dataPath, parentFolder);

    var imgExtension = fileName.slice((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);
    var imgName = curDate.getTime() + '.' + imgExtension;
    var imgFullPath = imagePath(dataPath, parentFolder + '/' + imgName);

    function saveImage() {
        var base64Data = req.body.base64Data.split(',')[1];
        return fs.writeFile(imgFullPath, base64Data, 'base64', function(err) {
            if (err)
                return res.status(403).send(err)
            return res.send(resourcePath('image', parentFolder + '/' + imgName))
        })
    }

    //check file is exist
    isExistPath(imgFullPath, function(isExist) {
        if (isExist)
            return res.status(403).send('File exist!')
        //check parent folder is exist
        isExistPath(parentPath, function(isExist) {
            if (!isExist) {
                var oldmask = process.umask(0);
                return fs.mkdir(parentPath, parseInt("0777", 8), function(err) {
                    process.umask(oldmask);
                    if (err)
                        return res.status(403).send('Can\' save Image');
                    return saveImage();
                })
            }
            return saveImage();
        })
    })
};

exports.unlinkImg = function(req, res) {
    var dataPath = req.app.get('pathStorage');
    var path = req.body.path;
    path = path.replace('resource\/image\/', '');
    var pathImg = imagePath(dataPath, path);
    isExistPath(pathImg, function(exists) {
        if (exists)
            return fs.unlink(pathImg, function(err) {
                if (err)
                    return res.status(403).send('Not found Image ' + pathImg);
                return res.status(200).send('Unlink Image ' + pathImg + ' Ok');
            })
        return res.status(403).send('Not found Image ' + pathImg);
    })
}
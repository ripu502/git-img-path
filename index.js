const fetch = require('node-fetch');

// changing the spaces with %20
const inputProcessing = (name) => {
    return name.replace(/\s/g, '%20')
}

// replace . from img name so object key can be made
const keyHelper = (name) => {
    var n1 = name.replace(/\s/g, '');
    var n2 = n1.replace(/\./g, '');
    if (!isNaN(n2.charAt(0))) {
        return 'N' + n2;
    } else {
        return n2;
    }
}

// making the api path for getting the result for the files of images
const makeApiPath = (username, publicrepoName, foldername, base) => {
    if (base == 1) {
        return `https://api.github.com/repos/${username}/${publicrepoName}/contents/`;
    } else {
        return `https://api.github.com/repos/${username}/${publicrepoName}/contents/${foldername}`;
    }
}

// making the image url from the path of the file from api
const imageUrlHelper = (username, publicrepoName, path) => {
    let processedPath = inputProcessing(path);
    return `https://raw.githubusercontent.com/${username}/${publicrepoName}/master/${processedPath}`;
}

// making the result json object from the api
const resultGenerator = (json, username, publicrepoName) => {
    const responsePack = {};
    json.forEach(element => {
        responsePack[keyHelper(element.name)] = imageUrlHelper(inputProcessing(username), inputProcessing(publicrepoName), element.path);
    })
    return responsePack;
}


// main function of Module
module.exports.gitImages = async (username, publicrepoName, foldername = '') => {
    const baseEnd = 0;
    if (username.length == 0) {
        return { error: 'username is wrong' };
    }
    if (foldername.length == 0) {
        base = 1;
    }
    if (publicrepoName.length == 0) {
        return { error: 'repo is not correct' };
    }
    const urlpath = makeApiPath(inputProcessing(username), inputProcessing(publicrepoName), inputProcessing(foldername), baseEnd);
    var res = await fetch(urlpath).then(res => res);
    var object = await res.json()
    var ans = await resultGenerator(object, username, publicrepoName);
    return ans;
}

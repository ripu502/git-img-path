const fetch = require('node-fetch');

const inputProcessing = (name) => {
    return name.replace(/\s/g, '%20')
}

const makeApiPath = (username, publicrepoName, foldername, base) => {
    if (base == 1) {
        return `https://api.github.com/repos/${username}/${publicrepoName}/contents/`;
    } else {
        return `https://api.github.com/repos/${username}/${publicrepoName}/contents/${foldername}`;
    }
}

const imageUrlHelper = (username, publicrepoName, path) => {
    let processedPath = inputProcessing(path);
    return `https://raw.githubusercontent.com/${username}/${publicrepoName}/master/${processedPath}`;
}

const resultGenerator = (json, username, publicrepoName) => {
    const responsePack = {};
    json.forEach(element => {
        responsePack[element.name] = imageUrlHelper(inputProcessing(username), inputProcessing(publicrepoName), element.path);
        // console.log(responsePack);
    })
    return responsePack;
}


module.exports.gitImages = async (username, publicrepoName, foldername) => {
    const baseEnd = 0;
    if (username.length == 0) {
        console.log('username is wrong');
    }
    if (foldername.length == 0) {
        console.log('folder is the base');
        base = 1;
    }
    if (publicrepoName.length == 0) {
        console.log('repo is not correct');
    }
    const urlpath = makeApiPath(inputProcessing(username), inputProcessing(publicrepoName), inputProcessing(foldername), baseEnd);
    var res = await fetch(urlpath).then(res => res);
    var object = await res.json()
    var ans = await resultGenerator(object, username, publicrepoName);
    // console.log(ans);
    return ans;
}

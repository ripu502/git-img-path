> # git-img-path
Node Module which is used to get the path of the images of public repo of github so that it can be used as a Assest, 

**Special Thanks to [@amolsr](https://github.com/amolsr)**

>## Functionality of Module
Sometime in our projects we have to add the images to s3 bucket and we get url of that image to use in out project.

But for such a small task, especially for the small projects for learning purposes using s3 is not a good option so why don't we use github to serve static file.

> ## Requirement
> 1. File should stored already on github to use serve statically from url
> 2. Module will no store file on github, you have to store file manually on public repo of github.
> 3. Internet connection is must using this module
> 4. This module uses node-fetch

>## How to use this Module

1. Install the module in working directory

	    npm i git-img-path --save
2. Passing yourUsername, publicRepo and folder to Module to serve files

	    const  gitImagePath = require('git-img-path');
	    gitImagePath.gitImages('Username', 'repoName', 'folderName').then(fileResult  => {
	    // img object have all the images
	    // suppose use have file Vishesh.jpg, you can find it at fileResult.Visheshjpg);
	    console.log(fileResult.Visheshjpg);
	    // suppose you have file index.js, you can find it at fileResult.indexjs
	      console.log(fileResult.Visheshjpg);
	    })
	
	**OR**
				

	    const { gitImages } = require('git-img-path');
    	const  helper = async () => {
    	const  fileResult = await  gitImages('Username', 'Repo', 'FolderName').then(res  =>  res);
    	console.log(fileResult.Abhimanyujpg);
    	// if the file name is index.js
    	console.log(fileResult.indexjs);
    	}
		helper();
3. If the file in in main directory no folder, send the folder field empty

	    gitImages('Username', 'Repo',  '')

> ### NOTE
 >1. Repo Must be Public
> 2. File can be any extension
 >3. Getting file from the same name
 >4. Suppose the fileName is a.txt the find it at atxt {key}
 >5. Return obj is of following type
>6. File name spaces are ignored in key
  >  {
	      'key1' : 'value1',
	       'key2': 'value2'
     }

 

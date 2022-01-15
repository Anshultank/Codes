(function(){
    let btnAddFolder = document.querySelector("#addFolder");
    let btnaddTextFile = document.querySelector("#addTextFile");
    let breadCrumb = document.querySelector("#breadcrumb");
    let divContainer = document.querySelector("#container");
    let templates = document.querySelector("#templates");
    let resources = [];
    let cfid = -1;
    let rid = 0;


    btnAddFolder.addEventListener("click", addFolder);
    btnaddTextFile.addEventListener("click", addTextFile);

    function addFolder(){
        let rname  = prompt("Enter Folder Name ");
        if (rname != null){
            rname = rname.trim();
        }
        if (!rname){
            alert("Empty name not allowed!");
            return;
        }
        
        let alreadyExists = resources.some(r => r.rname == rname && r.pid == cfid);
        if(alreadyExists == true){
            alert(rname + " is already in use. try another");
            return;
        }
        let pid = cfid;
        rid++;
        addFolderHTML(rname, rid, pid);
        resources.push({
            rid: rid,
            rname: rname,
            rtype: "folder",
            pid: cfid

        });
       saveToStorage();
    }

    function addTextFile(){
        let fname  = prompt("Enter Text File name");
        console.log(fname);
    }

    function deleteFolder(){
        console.log("Delete Folder");
    }

    function deleteTextFile(){

    }

    function renameFolder(){
       let nrname = prompt("Enter Folder name");
       if(nrname != null){
    nrname = nrname.trim();
    }
    }

    function renameTextFile(){

    }

    function viewFolder(){
        console.log("View Folder");
    }

    function viewTextFile(){

    }

    function addFolderHTML(rname, rid, pid){
        let divFolderTemplate = templates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate, true);

        let divName = divFolder.querySelector("[purpose=name]");
        let spanRename = divFolder.querySelector("[action=rename]");
        let spanDelete = divFolder.querySelector("[action=delete]");
        let spanView = divFolder.querySelector("[action=view]");
        
        
        spanRename.addEventListener("click", renameFolder);
        spanDelete.addEventListener("click", deleteFolder);
        spanView.addEventListener("click", viewFolder);
        divName.innerHTML = rname;
        divFolder.setAttribute("rid", rid);
        divFolder.setAttribute("pid", pid);

        divContainer.appendChild(divFolder);
    }

    function saveToStorage(){
     let rjson = JSON.stringify(resources);
     localStorage.setItem("data", rjson);
    }

    function loadFromStorage(){
    let rjson = localStorage.getItem("data");
   if(!rjson){return;}

    resources = JSON.parse(rjson);
    for(let i = 0; i < resources.length; i++){
        if(resources[i].pid == cfid){
            addFolderHTML(resources[i].rname, resources[i].rid, resources[i].pid);
        }
        if(resources[i].rid > rid){
            rid = resources[i].rid;
        }
    }
    }
    loadFromStorage();
})();
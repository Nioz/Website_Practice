function storeData() {
    let cName = document.getElementById("client").value;
    let pName = document.getElementById("proj").value;
    let budget = document.getElementById("budget").value;
    projects = JSON.parse(localStorage.getItem("projects") || "[]");
    let project = {cl:cName, pr:pName, bd:budget};
    console.log(JSON.stringify(project));
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));
}

function displayData() {
    let prjArr = JSON.parse(localStorage.getItem("projects"));
    console.log(localStorage.getItem("projects").length)
    var tableContent="";
    var startTable ="<table border=1><tr><th>Client</th><th>Project</th><th>Budget</th></tr>";
    var total = 0;
    var word = "Budget Totals: "
    prjArr.forEach(prjJson=>{ 
        tableContent =tableContent+"<tr><td>"+prjJson.cl+"</td><td>"+prjJson.pr+"</td><td>"+prjJson.bd+"</td></tr>";
        total += +prjJson.bd;
    })
    
    var endTable="</table>";
    tableContent = startTable+tableContent+endTable+word+total;
    document.getElementById("main").innerHTML=tableContent;
}
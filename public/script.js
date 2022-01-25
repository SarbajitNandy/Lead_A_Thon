function getCode() {
  var nameElem = document.getElementById("name");
  //   console.log(nameElem);
  var codename = nameElem.value;
  nameElem.value = "";
  console.log(codename);
  if (codename === undefined || codename === null) {
    alert(`${codename} - INVALID code name`);
    return;
  } else {
    $.ajax({
      url: `/api/${codename}`,
      type: "GET",
      success: function (data) {
        console.log(data);
        if (!(data instanceof Array)) data = [data];
        deleteTable();
        addTable(data);
      },
      error: function (error) {
        deleteTable();
        console.log("On Error");
        console.log(error);
        if (error.status != 200) {
          alert(`Status: ${error.statusText} : ${error.status}`);
        }
      },
    });
  }
}

// function addRow() {
//   var myName = document.getElementById("name");
//   var age = document.getElementById("age");
//   var table = document.getElementById("myTableData");

//   var rowCount = table.rows.length;
//   var row = table.insertRow(rowCount);

//   row.insertCell(0).innerHTML =
//     '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
//   row.insertCell(1).innerHTML = myName.value;
//   row.insertCell(2).innerHTML = age.value;
// }

// function deleteRow(obj) {
//   var index = obj.parentNode.parentNode.rowIndex;
//   var table = document.getElementById("myTableData");
//   table.deleteRow(index);
// }

function deleteTable() {
  var table = document.querySelector("#newTable table");
  if (table && table!==null)
    table.parentElement.removeChild(table);
}

function addTable(data) {
  console.table(data);
  var myTableDiv = document.getElementById("newTable");
  console.log(myTableDiv);
  var table = document.createElement("TABLE");
  // table.border = "1";
  // table.style.color=

  var tableBody = document.createElement("TBODY");
  table.appendChild(tableBody);

  for (var i = 0; i < data.length; i++) {
    if (i == 0) {
      var trHeader = document.createElement("TR");

      var thCode = document.createElement("TH");
      var thName = document.createElement("TH");
      var thData = document.createElement("TH");

      thCode.appendChild(document.createTextNode("Code"));
      thName.appendChild(document.createTextNode("Name"));
      thData.appendChild(document.createTextNode("Data"));
      trHeader.appendChild(thCode);
      trHeader.appendChild(thName);
      trHeader.appendChild(thData);

      tableBody.appendChild(trHeader);
    }
    var tr = document.createElement("TR");

    var tdCode = document.createElement("TD");
    tdCode.width = "75";
    var tdName = document.createElement("TD");
    tdName.width = "200";
    var tdData = document.createElement("TD");
    tdData.width = "1000";

    tdCode.appendChild(document.createTextNode(data[i].code));
    tdName.appendChild(document.createTextNode(data[i].name));
    tdData.appendChild(document.createTextNode(data[i].data));
    tr.appendChild(tdCode);
    tr.appendChild(tdName);
    tr.appendChild(tdData);
    // console.log(tr);

    tableBody.appendChild(tr);
  }
  console.log(tableBody);
  console.log(table);
  console.log(myTableDiv);
  myTableDiv.appendChild(table);
}

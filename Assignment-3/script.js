document.addEventListener("DOMContentLoaded", function () {
  const header = document.createElement("h2");
  header.textContent = "Full Name: Rui Huang | NUID: 002058671";
  document.body.insertBefore(header, document.body.firstChild);


  document.querySelectorAll(".dropDownTextArea").forEach(row => row.style.display = "none");

 
  document.querySelectorAll("#myTable input[type='checkbox']").forEach(checkbox => {
      checkbox.checked = false;
      let row = checkbox.closest("tr");
      row.style.backgroundColor = "white"; 
      row.cells[8].innerHTML = ""; 
  });

  const submitButton = document.getElementById("button");
  submitButton.disabled = true;
  submitButton.style.backgroundColor = "gray";
});

let studentCount = 3; 

document.querySelectorAll("#myTable img").forEach(img => {
  img.addEventListener("click", function () {
      let row = this.closest("tr").nextElementSibling;
      if (row && row.classList.contains("dropDownTextArea")) {
          row.style.display = row.style.display === "none" ? "table-row" : "none";
      }
  });
});

document.getElementById("add").addEventListener("click", function () {
  studentCount++;
  const table = document.getElementById("myTable");
  let newRow = table.insertRow(table.rows.length);
  newRow.innerHTML = `
      <td><input type="checkbox" /><br /><br /><img src="down.png" width="25px" /></td>
      <td>Student ${studentCount}</td>
      <td>Teacher ${studentCount}</td>
      <td>Approved</td>
      <td>Fall</td>
      <td>TA</td>
      <td>${12345 + studentCount}</td>
      <td>100%</td>
      <td></td>
  `;
  let detailsRow = table.insertRow(table.rows.length);
  detailsRow.classList.add("dropDownTextArea");
  detailsRow.style.display = "none";
  detailsRow.innerHTML = `<td colspan="8">Advisor:<br /><br />Award Details<br />Budget Number:<br />Tuition Number:<br />Comments:<br /><br />Award Status:<br /><br /></td>`;
  alert(`Student ${studentCount} Record added successfully`);
});

document.getElementById("myTable").addEventListener("change", function (e) {
  if (e.target.type === "checkbox") {
      let row = e.target.closest("tr");
      const submitButton = document.getElementById("button");

      if (e.target.checked) {
          row.style.backgroundColor = "yellow";
          if (!row.cells[8].querySelector(".delete-btn")) {
              let deleteButton = document.createElement("button");
              deleteButton.textContent = "Delete";
              deleteButton.className = "delete-btn";
              deleteButton.addEventListener("click", function () {
                  let studentName = row.cells[1].textContent;
                  row.nextElementSibling.remove();
                  row.remove();
                  alert(`${studentName} Record deleted successfully`);

                  const anyChecked = document.querySelectorAll("#myTable input[type='checkbox']:checked").length > 0;
                  submitButton.disabled = !anyChecked;
                  submitButton.style.backgroundColor = anyChecked ? "orange" : "gray";
              });
              row.cells[8].appendChild(deleteButton);

              let editButton = document.createElement("button");
              editButton.textContent = "Edit";
              editButton.className = "edit-btn";
              editButton.addEventListener("click", function () {
                  let studentName = row.cells[1].textContent;
                  let newName = prompt(`Edit details of ${studentName}`, studentName);
                  if (newName) alert(`${studentName} data updated successfully`);
              });
              row.cells[8].appendChild(editButton);
          }
      } else {
          row.style.backgroundColor = "white";
          row.cells[8].innerHTML = "";
      }

      const anyChecked = document.querySelectorAll("#myTable input[type='checkbox']:checked").length > 0;
      submitButton.disabled = !anyChecked;
      submitButton.style.backgroundColor = anyChecked ? "orange" : "gray";
  }
});

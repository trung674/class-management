$(document).ready(function() {
  // Class info
  $('.btn-class').on('click', function(e) {
    e.preventDefault();
    var class_info = $('#class-info');
    class_info.empty();
    var class_id = $(this).data('class-id');
    $.ajax({
      url: "http://localhost:3000/api/class/" + class_id,
      method: "GET",
      dataType: 'json',
      success: function(data) {
        var class_data = data.classroom[0];
        var students_data = data.students;
        console.log(students_data);
        var content = "<div class='panel panel-primary'><div class='panel-heading'>" + class_data.name + "</div>";
        if (students_data.length === 0) {
          content += "<div class='panel-body'>There is no student in this class</div>";
        } else {
          var table = "";
          for (var student of students_data) {
            table += "<tr><td>" + student.id + "</td><td>" + student.name + "</td><td>" + moment(student.dob).format('DD-MM-YYYY') + "</td><td>" + student.class_id + "</td>" +
            "<td>" + student.nationality + "</td><td>" + student.year_of_study + "</td>" +
            "<td><div><a href='/student/" + student.id + "/edit'>Edit</a></div>" +
            "<div><a class='text-danger' data-toggle='modal' data-target='#modal1'>Delete</a></div>" +
            "<div class='modal fade' id='modal1' tabindex='-1' role='dialog' aria-labelledby='modalLabel'>" +
            "<div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-body'><strong>Are you sure</strong></div>" +
            "<div class='modal-footer'><button class='btn btn-default' data-dismiss='modal'>Cancel</button><a class='btn btn-danger' href='/student/" + student.id + "/delete'>Delete</a></div></div></div></div></td></tr>";
          }

          content += "<div class='panel-body'><h4>There are " + students_data.length + " student(s) in this class</h4>" +
                        "<h4>The average student age is " + data.age_average + "</h4><br />" +
                        "<table class='table'><tr><th>ID</th><th>Student Name</th><th>Date of Birth</th><th>Class ID</th><th>Nationality</th><th>Year of study</th>" +
                        "<th>Actions</th></tr>" + table + "</table></div></div>";

        }
        class_info.append(content);
      },
      fail: function(err) {
        console.error(err);
      }
    });
  });

  //Class edit form
  // $('#class-edit-form').on('submit', function(e) {
  //   e.preventDefault();
  //   var class_id = $(this).data('class-id');
  //   var name = $('#class-name-' + class_id).val();
  //   var department = $('#class-department-' + class_id).val();
  //   var description = $('#class-description-' + class_id).val();
  //   $.ajax({
  //     url: "http://localhost:3000/api/class/" + class_id + "/edit",
  //     data: {
  //       name: name,
  //       department: department,
  //       description: description
  //     },
  //     method: "PUT",
  //     dataType: 'json',
  //     success: function() {
  //       $('#modal1').modal('toggle');
  //       $('#message').text('Successfully update the class data');
  //       $('#message').removeClass('hidden').addClass('alert alert-success');
  //       $('#class-name-' + class_id);
  //       $('')
  //     },
  //     fail: function(err) {
  //       $('#modal1').modal('toggle');
  //       $('#message').text('Something bad happened');
  //       $('#message').removeClass('hidden').addClass('alert alert-danger')
  //     }
  //   });
  // });
  //
  // function loadClassContent() {
  //   var class_content = $('#class-content');
  //   class_content.empty();
  //   $.ajax({
  //     url: "http://localhost:3000/api/class/" + class_id + "/edit",
  //     method: "GET",
  //     dataType: 'json',
  //     success: function(data) {
  //       var content = "<table class='table'><tr><th>ID</th><th>Class Name</th><th>Department</th><th>Description</th><th>Actions</th></tr></table>";
  //       var table = "";
  //       for (var classroom in data) {
  //         table += "<tr><td>" + classroom.id + "</td><td>" + classroom.name + "</td><td>" + classroom.department + "</td><td>" + classroom.description + "</td></tr>" +
  //         "<td><div><a href='/class/'></a></div></td>";
  //       }
  //     },
  //     fail: function(err) {
  //
  //     }
  //   });
  // }
});

    let inpNewTask = $('#inpNewTask')    
    let tasks = []
    if (localStorage.list) {
      tasks = JSON.parse(localStorage.list)
    }
    
    function refreshList () {
      localStorage.list = JSON.stringify(tasks)
      $("#taskList").empty()
      for (let i=0;i<tasks.length;i++) {
        let task = tasks[i]
        if(task!=null){
          $("#taskList").append(
            $('<li>')
            .attr('class', 'list-group-item col-sm')
            .append(
              $('<div>')
              .attr('class', task.done ? "row done" : "row")
              .append(
                $('<span>')
                .text(task.name)
                .attr('class', 'col-sm py-1'),
                $('<button>')
                .append(
                  $('<i>')
                  .attr('class', 'fas fa-chevron-circle-down fa-2x color')
                  .css('color', '#563D7C')
                  .hover(function () {
                      $(this).css('color', 'crimson');
                    },
                    function(){
                      $(this).css('color', '#563D7C')
                    }
                  )
                )
                .attr('class', 'btn mx-2')
                .click(function (e) { 
                  let temp1 = tasks.splice(i-1, 0, tasks.splice(i, 1)[0]);
                    
                  refreshList();
                })
                .css('display', i==tasks.length-1?"none":"block")
                  .hover(function () {
                    $(this).css('box-shadow', '5px 5px 30px purple');
                  },
                  function () {
                    $(this).css('box-shadow', 'none');
                  }
                ),
                $('<button>')
                .append(
                  $('<i>')
                  .attr('class', 'fas fa-chevron-circle-up fa-2x color')
                  .css('color', '#563D7C')
                  .hover(function () {
                    $(this).css('color', 'crimson');
                  },
                  function(){
                    $(this).css('color', '#563D7C')
                  }
                )
                )
                .attr('class', 'btn mx-2')
                .click(function (e) { 
                  let temp1 = tasks[i];
                  let temp2 = tasks[i-1];
                  tasks[i-1] = temp1;
                  // refreshList();
                  tasks[i] = temp2;               
                  refreshList();
                })
                .css('display', i==0?"none":"block")
                .hover(function () {
                    $(this).css('box-shadow', '5px 5px 30px purple');
                  },
                  function () {
                    $(this).css('box-shadow', 'none');
                  }
                ),
                $('<button>')
                .append(
                  $('<i>')
                  .attr('class', task.done?"fas fa-times-circle fa-2x":"fas fa-check-square fa-2x")
                  .css('color', task.done?"red":"green")
                )
                .attr('class', 'btn mx-2 col-sm-2')
                .click(function (e) { 
                  task.done = !task.done
                  refreshList()
                })
                .hover(function () {
                  $(this).css('box-shadow', task.done?'5px 5px 30px red':'5px 5px 30px green');
                  },
                  function () {
                    $(this).css('box-shadow', 'none');
                  }
                ),
                $('<button>')
                .text('DELETE')
                .attr('class', 'btn btn-danger col-sm-2 mx-2')
                .click(function (e) { 
                  tasks.splice(i, 1)
                  refreshList()                  
                })
                .hover(function () {
                    $(this).css('box-shadow', '5px 5px 30px red');
                  },
                  function () {
                    $(this).css('box-shadow', 'none');
                  }
                )
              )
            )
            .attr('class', task.done ? "list-group-item shadow list-group-item-success" : "list-group-item list-group-item-dark shadow bg-white rounded")
          )           
           
        }
      }
        
    }
  
    refreshList()
  
    function sortList () {
      tasks.sort(function (a, b) {
        return a.done - b.done
      })
      refreshList()
    }
  
    function clearList() {
      tasks = tasks.filter(function (t) {
        if(t)
            return !t.done
        else
            return false;
      })
      refreshList()
    }
  
    function addTask() {
      console.log(tasks)
      let taskName = inpNewTask.val()
      tasks.push({
        name: taskName,
        done: false
      })
      inpNewTask.val("")
      refreshList()
    }

    $('#btnAdd').click(function () { 
      addTask()      
    })

    inpNewTask.keyup(function (e) { 
      if (ev.keyCode == 13) {
        addTask()
      }
    })
  
    $('#btnSort').click(()=> {
      sortList()
    })
  
    $('#btnClear').click(function () {
      clearList()
    })
    // $('upArrow').hover(()=>{
    //   $('upArrow').toggleClass('move');
    // })
    

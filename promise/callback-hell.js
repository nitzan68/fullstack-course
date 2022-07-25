

$('#getUsersWebsiteCreds').on('click', getData)



function getData() {
  console.log('request is sending now')
  $('#usersWebsiteCredsList').html('')
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/websites',
    success: function (websites) {
      console.log('websites')
      console.log(websites)
      for (const website of websites){
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/bulk-users',
            data: JSON.stringify(website.users),
            contentType: 'application/json; charset=utf-8',
            success: function(users){
                console.log('users')
                console.log(users)
                for (const user of users){
                    $.ajax({
                        type: 'GET',
                        url: `http://localhost:3000/role/${user.role}`,
                        success: function(role){
                            console.log('role')
                            console.log(role)
                        },
                        error: function(error){
                            console.log('error')
                            console.log(error)
                        }
                    })
                }
            },
            error: function(error){
                console.log('error')
                console.log(error)
            }
        })
      }
    },
    error: function(error){
        console.error(error.status)
    }
  })
}

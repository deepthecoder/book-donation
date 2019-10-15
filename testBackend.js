let caller=function(bookName,authorName){
//The only package required to make an HTTP request...Alternative for CURL

if(bookName.length==0 || authorName.length==0){
  alert("Please don't leave a field empty")
}
else{
  //The API Url for Hasura Console
  let api_url='https://shubharthi-app.herokuapp.com/v1/graphql'

  //The hashCode function generates a hash for a given string
  let hashCode = function(s) {
    var h = 0, l = s.length, i = 0;
    if ( l > 0 )
      while (i < l)
        h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
  };

  //let bookName="Jungle Book"
  //let authorName="Rudyard Kipling"
  authorName=authorName.toUpperCase()
  bookName=bookName.toUpperCase()

  let bookIdGenerator=bookName+authorName
  let idGenerator=hashCode(bookIdGenerator.replace(/\s+/g, ""))
  console.log(idGenerator)


  let authorIdGenerator=idGenerator+authorName
  let author_id=hashCode(authorIdGenerator.replace(/\s+/g, ""))

  //HTTP Call to the GraphQL Api

  let fieldQuery=function(q_string){
      fetch(api_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q_string }),
    })
      .then(res => res.json())
    .then(function(res){
      if(res.data.book.length==0)
        flag=1
      nextflag(flag)
    })
  }

  let flag=0
  let nextflag=function(flag){
    if(flag)
      fieldMutate()
    else
      fieldUpdate()
  }

  let fieldMutate=function()
  {
      let m_string="mutation{insert_book(objects:[{id:"+idGenerator+",name:\""+bookName+"\",author_id:"+author_id+"}]){returning{name}} insert_author(objects:[{id:"+author_id+",author_name:\""+authorName+"\"}]){returning{id}}}"
      fetch(api_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: m_string }),
      })
        .then(res => res.json())
      .then(function(res){
        console.log("Insertion Done")
        alert("Thank You For Donating ! Donation Done")
      })

  }

  let fieldUpdate=function(){
    let u_string="mutation {update_book(where: {id: {_eq:"+idGenerator+"}}, _inc: {count: 1}){returning{id}}}"
    fetch(api_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: u_string }),
    })
      .then(res => res.json())
    .then(function(res){
      console.log("Updation Done")
      alert("Thank You For Donating ! Donation Done")
    })
  }

  let q_string = "query{book(where:{id:{_eq:"+idGenerator+"}}){name}}"
  fieldQuery(q_string)
  }
}

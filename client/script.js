
    async function addUser(event){
        event.preventDefault();
        console.log("Reached here")
    
        let id = document.getElementById('id').value;
        let title = document.getElementById('title').value;
        let description = document.getElementById('description').value;
        let category = document.getElementById('category').value;
        let price = document.getElementById('price').value;
        let imageurl = document.getElementById('imageurl').value;
        let ratingrate = document.getElementById('ratingrate').value;
        let ratingcount = document.getElementById('ratingcount').value;
    
        let iderror = document.getElementById('id-error')
        let titleerror = document.getElementById('title-error')
        let descriptionerror = document.getElementById('description-error')
        let categoryerror = document.getElementById('category-error')
        let priceerror = document.getElementById('price-error')
        let imageurlerror = document.getElementById('imageurl-error')
        let ratingrateerror = document.getElementById('ratingrate-error')
        let ratingcounterror = document.getElementById('ratingcount-error')
    
    
    
        // let emailregex = /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
        if(!id){
            iderror.innerHTML = "id required"
        }
        if(!title){
            titleerror.innerHTML = "title required"
        }
        if(!description){
            descriptionerror.innerHTML = "description required"
        }
        if(!category){
            categoryerror.innerHTML = "category required"
        }
        if(!price){
            priceerror.innerHTML = "price required"
        }
        if(!imageurl){
            imageurlerror.innerHTML = "imageurl required"
        }
        if(!ratingrate){
            ratingrateerror.innerHTML = "ratingrate required"
        }
        if(!ratingcount){
            ratingcounterror.innerHTML = "ratingcount required"
        }
    
        let datas = {
            id,
            title,
            description,
            category,
            price,
            imageurl,
            ratingrate,
            ratingcount,
        }
        
        let json_data = JSON.stringify(datas)
        console.log("json_data : ",json_data);
    
        let response = await fetch('/submit',{
            method : 'POST',
            headers : {
                'Content-Type'  : "application/json"
            },
            body : json_data,
        });
        console.log("response : ",response); 
    
        let parsed_response = await response.text();
        console.log("parsed_response : ", parsed_response)
    
        if(parsed_response) {
            alert(parsed_response);
            return;
        }else {
            alert("something went wrong");
        }
    }
    
    
    
    
    async function fetchData() {
    
        try {
          
    
        let datas = await fetch("/submit");
        let parsed_datas = await datas.json();
        console.log("parsed_datas : ", parsed_datas);
    
      
    
        let datacontainer = document.getElementById('datacontainer');
    
    
        // let Datacontainer2 = document.getElementById('datacontainerdiv2');
    
        // let Datacontainer3 = document.getElementById('datacontainerdiv3');
    
    
      let rows = '';
    
    //   let rows2 = '';
    //   let rows3 = '';
    
     
      
      for(i=0 ; i< parsed_datas.length ; i++){
        
        let id = parsed_datas[i]._id
      
        
          
            rows = rows + `
            
           <div class="container mt-5 shadow p-3 mb-5 bg-body rounded lh-lg">
           <div id = "imageid" ><img onclick="handleClick('${id}')" src ="${parsed_datas[i].imageurl} "class = "datacontainerimg"></div>
            <div id = "titleid">${parsed_datas[i].title}</div>
            <div id = "descriptionid">${parsed_datas[i].description.slice(0,150)+"..."}</div>
            <div id = "categoryid">${parsed_datas[i].category}</div>
             <div id = "priceid">${parsed_datas[i].price}</div>
            <div id = "ratingid">Rating : ${parsed_datas[i].ratingrate}</div>
            <div id="btnid" class = "text-center"><button onclick="handleClick('${id}')">Details</button></div>
           </div>
           
           `
           console.log("mongodb_id : ",id)
          }
        
           datacontainer.innerHTML=rows;
          
        }
    catch (error) {
          console.log("error : ", error);
        }
    }


    function  handleClick(id){
        console.log("button clicked",id);
        console.log("button clicked id :",id)
        window.location.href =`single.html?id='${id}'`
        
      }
     


async function fetchDatas() {

    try {
        let location = window.location;
        console.log("location", location);

        let querystring = location.search;
        console.log("querystring", querystring);


        let urlParams = new URLSearchParams(querystring);
        console.log("url", urlParams);

        let ids = urlParams.get("id");
        console.log("id ", ids);

        let display = await fetch(`/user?id=${ids}`);
        let parsed_datas1 =json.parse(display);
        console.log("parsed_datas1 : ", parsed_datas1);

        // let xhr = new XMLHttpRequest();
        // xhr.open("get", `/user/'${ids}' `)
        // xhr.send();
        // xhr.onreadystatechange = function () {
        //   if (xhr.readyState === 4) {
        //       console.log("status:", xhr.status);
        //       if (xhr.status === 200) {
        //           console.log("success");
        //           let userData = xhr.response;
        //           console.log("userData:",userData);
        //           let parsed_userData = JSON.parse (userData);
        //           console.log("parsed_userData",parsed_userData);


        //           }
        //        }
        //     }
    }
    catch (error) {
        console.log("error : ", error);
    }

}
    

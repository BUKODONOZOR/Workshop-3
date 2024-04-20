

document.getElementById("btn").addEventListener("click" , function(event) {
    event.preventDefault(); 

    const GetAction = axios.get('http://localhost:3000/Usarios')
    .then(response => {
        basededatos = response.data;
        console.log(basededatos);
    })
    .catch(error => {
        // Manejo de errores
        console.error('Error:', error);
    });


    var Nombre = prompt("Ingrese su nombre");
    const Dominio = "Papasfritas@gmail.com";
    var Nombreestandarizado = Nombre.toLowerCase();
    console.log(Nombreestandarizado);

   
    ListaUsuarios = [

    ]

    var NombreApellido = Nombreestandarizado.split(' '); 
    var NombreUsuario =""
    NombreApellido.forEach(element => {
        
        NombreUsuario = NombreUsuario + element.slice(0,3)
    });

    


    
    var CorreoElectronico = NombreUsuario + Dominio

    console.log(NombreUsuario, CorreoElectronico);



    var User = {
        UserNamer: NombreUsuario ,
        EmailUser: CorreoElectronico
    }

    ListaUsuarios.push(User);
    console.log(ListaUsuarios); 

        axios.post(`http://localhost:3000/Usarios`, User)
        .then(response => {
            console.log('Objeto agregado:', response.data);
        })
        .catch(error => {
            console.error('Hubo un problema al agregar el objeto:', error);
        });   

})


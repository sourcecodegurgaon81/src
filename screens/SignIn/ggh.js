
    const Login = async () => {
        fetch('https://gowebtutorial.com/api/json/user/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": ""
            },
            body:JSON.stringify({ "username":'gagarhymes',
            "password":'qvwnhc294'})
        }).then((response) => response.json())
            .then((res) => {
                if (typeof (res.message) != "undefined") {
                    alert("Error", "Error: " + res.message);
                }
                else {
                    console.log(res)
                    alert("Welcome");
                    await fetch('http://gowebtutorial.com/api/json/system/connect', {
                        method: 'POST',

                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'X-CSRF-Token': searchPostcode
                        }
                    }).then((response) => response.json())
                        .then(async (response) => {

                            console.log(response)
                        })
                }
            }).catch((error) => {
                console.error(error);
            });
    }
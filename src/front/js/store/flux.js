const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      listaProductos: [],
      carro: [],
      token: null,

      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      login: (valores) => {
        const store = getStore();
        fetch(process.env.BACKEND_URL + "/api/login", {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "content-type": "application/json",
          },
        })
          .then((resp) => {
            if (resp.status == 401) {
              console.log(resp.ok);
              console.log(resp.status);
            }

            return resp.json();
          })
          .then((data) => {
            if (!data.msg) {
              setStore({ token: data.token });
              sessionStorage.setItem("token", data.token);
              console.log(store.token);
            } else console.log(data.msg);
          })

          .catch((err) => console.log(err));
      },

      getListProducts: () => {
        const store = getStore();
        fetch(process.env.BACKEND_URL + "/api/products")
          .then((response) => response.json())
          .then((data) =>
            setStore({
              listaProductos: [...store.listaProductos, data.data],
            })
          )

          .catch((err) => console.log(err));
      },

      postCarro: async (productId) => {
        const store = getStore();

        const response = await fetch(
          process.env.BACKEND_URL + "/api/addtocard",
          {
            method: ["POST"],
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ productId: productId }),
          }
        );

        // setStore({ carro: [...store.carro, item] });
        //console.log(store.carro);
      },

      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;

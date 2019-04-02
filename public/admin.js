var app = new Vue({
  el: '#admin',
  data: {
  
	//  title: "",
	  file: null,
	 addItem: null,
	  items: [],
          findName: "",
	  findItem: null,
	  playerName: "",
	  charName: "",
	  charClass: "",
	  age: 0,
	  male: true,
	  gender: "male",
	  
	  heart: 0,
	  might: 0,
	  mind: 0,
	  strength: 0,
	  faith: 0,



  },

   created() {
	   this.getItems();
   },


  computed: {

	      suggestions() {
		      console.log(this.items.filter(item => item.playerName.toLowerCase().startsWith(this.findName.toLowerCase())));
		      return this.items.filter(item => item.playerName.toLowerCase().startsWith(this.findName.toLowerCase()));
	      }
	  

  },

  methods: {
  
  fileChanged(event) {
	        this.file = event.target.files[0]
	      },

	  async getItems() {
		  try {
			  let response = await axios.get("/api/items");
			  this.items = response.data;
			  console.log(response.data);
			  return true;
		  } catch (error) {
			  console.log(error);
		  }
	  },

  selectItem(item) {
	  this.findName = "";
	  this.findItem = item;
  },


      async upload() {
            try {
	            const formData = new FormData();
	            formData.append('photo', this.file, this.file.name)
	            let r1 = await axios.post('/api/photos', formData);
	            let r2 = await axios.post('/api/items', {
	               //title: this.title,
			   playerName: this.playerName,
			   charName: this.charName,
			   charClass: this.charClass,
			    age: this.age,
			    
			    heart: this.heart,
			    might: this.might,
			    mind: this.mind,
			    strength: this.strength,
			    faith: this.faith,
			    male: this.male,
			    gender: this.gender,
	               path: r1.data.path
			  
	            });
		    console.log("UPLOADED");
	            this.addItem = r2.data;
	          } catch (error) {
  	          console.log(error);
	        }
          },

    async deleteItem(item) {
	    try {
		    let response = axios.delete("/api/items/" + item._id);
		    this.findItem = null;
		    this.getItems();
		    return true;
	    } catch (error) {
		    console.log(error);
	    }
    },

	  genderPickMale() {

		  this.male = true;
		  this.gender = "male";
	  },
	  genderPickFemale() {
		this.male = false;
		  this.gender = "female";
	  },
	  
	  async editItem(item) {
		    try {
			    let response = await axios.put("/api/items/" + item._id, {
				    charName: this.findItem.charName,
				    heart: this.findItem.heart,
				    might: this.findItem.might,
				    mind: this.findItem.mind,
				    strength: this.findItem.strength,
				    faith: (parseInt(this.findItem.heart) + parseInt(this.findItem.might)),
			    });
			    this.findItem = null;
			    this.getItems();
			    return true;
		    } catch (error) {
			    console.log(error);
		    }
	    },



	  rollHeart() {
		  this.heart = Math.floor(Math.random() * 7) + 2;
		  this.faith = this.heart + this.might;
	  },

	  rollMight() {
		  this.might = Math.floor(Math.random() * 7) + 2;
	 	  this.faith = this.heart + this.might;
	  },

	  rollMind() {
			this.mind = Math.floor(Math.random() * 7) + 2;
		},

	  rollStrength() {
		  this.strength = Math.floor(Math.random() * 7) + 2;
	  },



  },
	




});

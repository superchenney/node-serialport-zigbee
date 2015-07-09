module.exports = { 

	user:{ 
		name:{type:String,required:true},
		password:{type:String,required:true}
	},

	//chenney
	gate:{
		gatename:{
			type: String,
			default: "1号门禁"
		},
		username:{
			type:String
		},
		Address:{
			type:String,
			default:"校区西北门"
		},
		pressure:{
			type:String
		},
		operate:{
			type: String
		},
		date:{
			type:Date,
			default:Date.now()
			}

	}//gate

};
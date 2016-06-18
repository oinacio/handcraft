
# Handcraft Application

## Projecto ref: [loopback][id1]
------------
## structure:
* platform: [Bluemix][id2]
	* Nodejs + loopback
* data: [Cloudant][id3]
	* `loopback:datasource`: cloudante (cloudantCraftDB)
		* `database`: handcraft
---------------------


## Models
`loopback:model` __Handcraft__ Base class: _PersistedModel_

| Property name | Property type | Required | Default   |
|:-------------:|:-------------:|:--------:|:---------:|
| name          | string				| yes			 |           |
| segment 			| string				| yes			 |           |
| feedstock 		| string				| yes      |					 |
| category      | string        | yes      |					 |
| label         | string        |          | " "			 |
| price         | number        | no      |            |
| description   | string        | yes      |           |
|timestamp			| mixins        | yes      |           |
```
{
  "name": "Handcraft",
  "base": "PersistedModel",
  "strict": false,
  "idInjection": false,
  "options": {
    "validateUpsert": true
  },
  "mixins": {
    "TimeStamp": true
  },
  "properties": {
    "name": {
      "type": "string",
      "required": true
    },
    "segment": {
      "type": "string"
    },
    "feedstock": {
      "type": "string"
    },
    "category": {
      "type": "string"
    },
    "label": {
      "type": "string"
    },
    "price": {
      "type": "number"
    },
    "description": {
      "type": "string"
    }
  },
  "validations": [],
  "relations": {
    "comments": {
      "type": "hasMany",
      "model": "Comment",
      "foreignKey": ""
    },
    "customers": {
      "type": "hasMany",
      "model": "Customer",
      "foreignKey": ""
    },
    "user": {
      "type": "belongsTo",
      "model": "User",
      "foreignKey": ""
    }
  },
  "acls": [
    {
      "accessType": "*",
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "DENY"
    },
    {
      "accessType": "READ",
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "ALLOW"
    },
    {
      "accessType": "EXECUTE",
      "principalType": "ROLE",
      "principalId": "$authenticated",
      "permission": "ALLOW",
      "property": "create"
    },
    {
      "accessType": "WRITE",
      "principalType": "ROLE",
      "principalId": "$owner",
      "permission": "ALLOW"
    }
  ],
  "methods": {}
}
```


`loopback:model` __Comment__ Base class: _PersistedModel_

| Property name | Property type | Required | Default   |
|:-------------:|:-------------:|:--------:|:---------:|
| rating        | number				| yes			 |           |
| description 	| string				| yes			 |           |
|timestamp			| mixins        | yes      |           |
```
{
  "name": "Comment",
  "base": "PersistedModel",
  "idInjection": true,
  "options": {
    "validateUpsert": true
  },
  "mixins": {
    "TimeStamp": true
  },
  "properties": {
    "rating": {
      "type": "number",
      "required": true
    },
    "comment": {
      "type": "string",
      "required": true
    }
  },
  "validations": [],
  "relations": {
    "handcraft": {
      "type": "belongsTo",
      "model": "Handcraft",
      "foreignKey": ""
    },
    "customer": {
      "type": "belongsTo",
      "model": "Customer",
      "foreignKey": "publisherId"
    }
  },
  "acls": [
    {
      "accessType": "*",
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "DENY"
    },
    {
      "accessType": "READ",
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "ALLOW"
    },
    {
      "accessType": "EXECUTE",
      "principalType": "ROLE",
      "principalId": "$authenticated",
      "permission": "ALLOW",
      "property": "create"
    },
    {
      "accessType": "WRITE",
      "principalType": "ROLE",
      "principalId": "$owner",
      "permission": "ALLOW"
    }
  ],
  "methods": {}
}
```

`loopback:model` __Customer__ Base class: __User__

| Property name | Property type | Required | Default   |
|:-------------:|:-------------:|:--------:|:---------:|
|timestamp			| mixins        | yes      |   
```{
  "name": "Customer",
  "base": "User",
  "idInjection": true,
  "options": {
    "validateUpsert": true
  },
  "mixins": {
    "TimeStamp": true
  },
  "properties": {},
  "validations": [],
  "relations": {
    "comments": {
      "type": "hasMany",
      "model": "Comment",
      "foreignKey": "publisherId"
    }
  },
  "acls": [],
  "methods": {}
}
```

`loopback:model` __Favorite__ Base class:  _PersistedModel_     
   
| Property name | Property type | Required | Default   |      
|:-------------:|:-------------:|:--------:|:---------:|       
|timestamp			| mixins        | yes      |           
```
{
  "name": "Favorite",
  "base": "PersistedModel",
  "idInjection": true,
  "options": {
    "validateUpsert": true
  },
  "properties": {
    "description": {
      "type": "string"
    }
  },
  "mixins": {
    "TimeStamp": true
  },
  "validations": [],
  "relations": {
    "handcrafts": {
      "type": "hasMany",
      "model": "Handcraft",
      "foreignKey": ""
    },
    "user": {
      "type": "belongsTo",
      "model": "User",
      "foreignKey": ""
    }
  },
  "acls": [
    {
      "accessType": "*",
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "DENY"
    },
    {
      "accessType": "EXECUTE",
      "principalType": "ROLE",
      "principalId": "$authenticated",
      "permission": "ALLOW",
      "property": "create"
    },
    {
      "accessType": "WRITE",
      "principalType": "ROLE",
      "principalId": "$owner",
      "permission": "ALLOW"
    },
    {
      "accessType": "READ",
      "principalType": "ROLE",
      "principalId": "$owner",
      "permission": "ALLOW"
    }
  ],
  "methods": {}
}
```
-------------------------------
## Relation

+ A handcraft has many comments.     
+ A handcraft belong to a customers.      
+ A comment belongs to a handcraft.     
+ A comment belongs to a customer.       
+ A customer has many comments.           
+ A favorite has many handcrafts.      
+ A favorite belongs to a Customer      

----------------------------------
## Access Control List

+ Anyone can read comment, but you must be logged in to create, edit, or delete them.                           
+ Anyone can register as a user; then log in and log out.                             
+ Logged-in users can create new comments, and edit or delete their own comemnts. however they cannot modify the handcraft for a comment.          
+ Logged-in users can create new Handcrat, and edit or delete their own Handcraft.                           
+ Logged-in users can create new Favorite, and edit or delete their own Favorite; however the user owning the object.             
    

-----------------------------------

### Front-End                           
 [Create AngularJS client - Generate lb-services.js][id7]  
 
 ### Static Page
>add: <kbd>`server/middleware.json`
	>```
	>    "files": {
	>    "loopback#static": {
	>      "params": "$!../client"
	>    }
	>  },
	>```


### HTML Page
>add: <kbd>`client/index.html`             
>add: <kbd>`client/handcraft.html`                  
>add: <kbd>`client/comment-form.html`                
>add: <kbd>`client/list-all.html`                  
>add: <kbd>`client/success.html`                    

                    

 
 [id7]:https://docs.strongloop.com/display/public/LB/Create+AngularJS+client#CreateAngularJSclient-Generatelb-services.js
 [id1]:https://docs.strongloop.com/display/public/LB/LoopBack "loopback"
 [id2]:http://www.ibm.com/cloud-computing/bluemix/
 [id3]:https://6081a28c-fb6c-4ed6-bc37-e68a7c3f9c08-bluemix.cloudant.com/dashboard.html
 






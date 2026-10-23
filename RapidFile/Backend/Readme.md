#api

user Roles
post -> [key user defined - > uuid()] data :-> text, image    ----> if (image -> imagekit -> url) else -----> db -> [Key value] 
get  -> [key -> find uuid()] if(uuid() == key.uuid) -> db  ---> data 



code to uuid
model 
    key      value 
    101     h5ljh5-5k53q24k


db model
----------------
_id: mongodb.id()
siteURL: string
text : string 
imageURL/URLS : string[]
creation time: Date()
expiry time: Date()


for storage save if user login in second time backend revoked = > expiry time check and boom



tasks :
1 > crate data model
2 > upload system

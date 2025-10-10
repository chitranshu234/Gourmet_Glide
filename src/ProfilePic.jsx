function ProfilePic(){
    const imgURL = "./src/profile.jpg"
    const handleClick2 = (e) => e.target.style.display = "none";
    return (
        <img src={imgURL} onClick={(e) => handleClick2(e)}></img>

    );
}
export default ProfilePic;
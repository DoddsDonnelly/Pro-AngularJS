if (me === undefined || me.username != "admin"){
    cancel("No Authorization", 401);
}
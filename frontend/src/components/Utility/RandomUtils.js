export function MakeID(length) {
    var result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export function ReadParam(wind, param) {
    if (param !== "") {
        const queryString = wind.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(param);
    } else {
        const ret = wind.location.pathname.split("/");
        return ret[ret.length - 1];
    }
}

export function GenerateLocalURL(path) {
    return process.env.REACT_APP_CURRENT_ORIGIN + path;
}
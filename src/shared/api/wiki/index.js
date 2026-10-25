const URL = "http://127.0.0.1:2014/wiki"
const header = {
    'Content-Type': 'application/json'
}
const wikiApi = {
    getAllCharacters: async () => {
        const responce = await fetch(`${URL}/getCharacters`, {credentials: 'include'})
        return responce.json()
    },
    addFavoriteCharacter: async (characterId) => {
        const responce = await fetch(`${URL}/addfavoriteCharacters`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify({id: characterId }),
            credentials: 'include'
        })
        if(!responce.ok){
            throw new Error('can not add new FavCharacter')
        }
        return true
    }
}

export default wikiApi
import db from "$Database"
import Fetch from "./fetch.server"
import Auth from "./auth.server"

export default new class {
    Fetch = new Fetch(db)
    Auth = new Auth(db)
}
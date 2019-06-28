import { Database } from '@vuex-orm/core'
import Creature from '@/models/Creature'
/*
import Todo from '@/models/Todo'
*/
const database = new Database()
database.register(
    Creature,
    {}
)
/*
database.register(Todo, {})
*/
export default database
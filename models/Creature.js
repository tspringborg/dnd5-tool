import { Model } from '@vuex-orm/core'

export default class Creature extends Model {
    static entity = 'creatures'
    static fields() {
        console.log(this)
        return {
            name: this.attr(''),
            attributes: this.attr((a) => {
                console.log(this)
            }),
        }
    }
}
import spells_php from '@/assets/spells-php.json'
import spells_scag from '@/assets/spells-scag.json'
import spells_xge from '@/assets/spells-xge.json'

export default {
    state: () => {
        return {
            list: [].concat(
                spells_php.spell,
                spells_scag.spell,
                spells_xge.spell,
            ),
        }
    },
}

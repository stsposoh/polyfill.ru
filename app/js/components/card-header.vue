
<template>
    <a href="#" v-if="!button" @click.prevent="loginRequired(toggle)">
        <span v-text="text"></span>
    </a>
    <span v-else class="btn" :class="{'btn--loading': loading}" v-tooltip="text" @click="toggle">
        <span class="btn__wrapper">
            <span class="btn__icon">
                <svg class="icon icon--24" viewBox="0 0 24 24">
                    <use :xlink:href="'#' + (inBlacklist ? 'icon-remove' : 'icon-check')"/>
                </svg>
            </span>
        </span>
    </span>
</template>

<script>


    export default {
        name: 'card-header',

        directives: {
            tooltip
        },

        props: {

            url: {
                type: String,
                required: true
            },

            blacklisted: {
                type: Boolean,
                default: false
            },

            button: {
                type: Boolean,
                default: false
            }

        },

        data() {
            return {
                loading: false,
                inBlacklist: this.blacklisted
            }
        },

        computed: {
            text() {
                return this.inBlacklist ? 'Удалить из ЧС' : 'Добавить в ЧС'
            }
        },

        methods: {
            toggle() {
                if (this.loading) return;

                this.loading = true;

                http.post(this.url, { action: this.inBlacklist ? 'remove' : 'add' })
                    .then(({ data }) => {
                        this.loading = false;
                        this.inBlacklist = !this.inBlacklist;
                        this.$emit('onchange', this.inBlacklist);
                    })
                    .then(undefined, error => {
                        this.loading = false;
                        console.log(error)
                    })
            }
        }
    }

</script>
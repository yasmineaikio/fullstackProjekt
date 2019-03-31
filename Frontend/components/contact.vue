<template>
    <div  class="container is-fluid" >
        <section id="contact-con" class="contact-info" style="background-image:url('http://greenish.haahe.net/wp-content/uploads/2018/12/fuse-brussels-273772-unsplash.jpg')">
            <div class="columns" style="padding:2%; min-height:600px;">
                <div class="column is-half">
                    <h2 class="banner is-size-4 has-background-dark has-text-white has-text-centered"><span>Adress och kontaktuppgifter</span></h2>
                    <div id="contact-info">
                        <p>Bokgatan 212 <br> 561 32 Falkenberg <br> falkenberg.bok@books.se <br>076-7827892</p>
                    </div>
                </div>
                <div class="column is-half has-text-centered">
                    <h2 class="banner is-size-4 has-background-dark has-text-white has-text-centered"> <span>Skriv till oss</span></h2>
                    <div class="arrow bounce"></div>
                    <button class="button is-warning is-large" style="width:150px;" @click="isComponentModalActive = true"><font-awesome-icon class="msg-icon" :icon="{ prefix: 'fa', iconName: 'envelope' }"/></button>
                    <b-modal class="modalForm" :active.sync="isComponentModalActive" has-modal-card>
                        <modal-form></modal-form>
                    </b-modal>
                </div>
            </div>
        </section>
        <section class="map is-fluid">
            <h3 class="divider has-background-dark has-text-white has-text-centered is-fluid is-size-4">Hitta till oss</h3>
            <GmapMap
                class="map-komp"
                :center="{lat:56.9070429, lng:12.487072}"
                :zoom="15"
                map-type-id="terrain"
                style="width: 100%; height: 300px;"
            >
            <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center=m.position"
            />
            </GmapMap>
        </section>
    </div>
    
</template>

<script>
import { Snackbar } from 'buefy/dist/components/snackbar'
import router from "../router" 
import moment from 'moment'
import  uuid  from 'vue-uuid'
const ModalForm = {
        data (){
            return {
                name: '',
                subject: '',
                email: '',
                content: '',
            }
        },
        methods:{
            send() {
                let date = moment().format('LL')
                let id = this.$uuid.v1()
                let msg = {'name':this.name, 'email':this.email, 'subject': this.subject, 'content': this.content, 'date': date, 'id':id}
                fetch('http://localhost:3000/inbox', {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify(msg)
                }).then (response => response.json())
                .then(() => {
                    Snackbar.open('Tack för ditt meddelande!')
                })
            }
        },
        template: `
            <form action="">
                <div id="formModal" class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Meddelande</p><span id="closeButton" @click="$parent.close()">X</span>
                    </header>
                    <section class="modal-card-body has-text-left">
                        <form @submit.prevent="send()">
                            <section>
                                <b-field>
                                    <b-input placeholder="Fullständigt namn" type="text" v-model="name" required></b-input>
                                </b-field>
                                <b-field>
                                    <b-input placeholder="Epostaddress" type="email" v-model="email" required>
                                    </b-input>
                                </b-field>
                                <b-field>
                                    <b-input placeholder="Ämne" type="text" v-model="subject" required></b-input>
                                </b-field>
                                <b-field>
                                    <b-input type="textarea"
                                        minlength="10"
                                        maxlength="400"
                                        v-model="content"
                                        placeholder="Ditt meddelande">
                                    </b-input>
                                </b-field>
                                <button type="submit" class="button is-warning" @click="$parent.close()">
                                    Skicka meddelandet
                                </button>
                            </section>
                        </form>
                    </section>    
                </div>
            </form>
        `
    }
export default {
        data(){
        return {
            isComponentModalActive: false,
        }
    },
    components: {
         ModalForm
    }
}
</script>

<style>
    .contact {
        width: 100%;
    }

    #contact-con {
        background-position: center;
        background-size: cover;
        margin-top: 1em;
    }

    #closeButton {
        cursor: pointer;
        padding: 3px 5px;
        border: 2px solid #999;
        border-radius: 50%;
    }

    #formModal {
        width: 500px;
    }

    .divider, .banner  {
        padding: 15px;
    }

    #contact-info {
        padding: 10px;
        border-left: 2px solid #FFDB4A;
    }

    .msg-icon {
        font-size: 1.5em;
    }
    
</style>

/*
    Tugas Week #01

    Basilius Bias Astho Christyono - 000.000.13536

    https://discordapp.com/users/306076547616473089

    Ionic -- Without Angular (CDN Only)
*/

// User DialogBox Alert
async function presentAlert(ttl, subTtl, txt, btn) {

    // Get Controller Element
    const alertController = document.querySelector('ion-alert-controller');

    // Alert Dialog Content
    const alert = await alertController.create({
        header: ttl,
        subHeader: subTtl,
        message: txt,
        buttons: btn
    });

    // Show Dialog
    return await alert.present();
}

// Add A New Data Modal Box
class AddDataModalBox extends HTMLElement {

    constructor() {
        super();
    }

    // Modal Box Content
    async connectedCallback() {
        this.innerHTML = `
            <!-- Card -->
            <ion-card>

                <!-- Card Title & Subtitle -->
                <ion-card-header>
                    <ion-card-title>Data Baru!</ion-card-title>
                    <ion-card-subtitle>Catatan Anggaran</ion-card-subtitle>
                </ion-card-header>

                <!-- Card Content -->
                <ion-card-content>

                    <!-- Input Text -->
                    <ion-item>
                        <ion-label position="floating">Nama Pengeluaran</ion-label>
                        <ion-input id="key" type="text"></ion-input>
                    </ion-item>

                    <!-- Input Number -->
                    <ion-item>
                        <ion-label position="floating">Jumlah Anggaran</ion-label>
                        <ion-input id="value" type="number"></ion-input>
                    </ion-item>

                    <!-- User Action -->
                    <ion-grid slot="end" class="ion-margin-top ion-float-right">
                        <ion-row>
                            <ion-col>
                                <ion-button color="primary" onclick="addNewData();">
                                    <ion-icon name="add"></ion-icon>
                                    <ion-text> &nbsp; Tambah &nbsp; </ion-text>
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-grid>

                </ion-card-content>

            </ion-card>
        `;
    }
}

// Change Name Class To Static Variable
customElements.define('add-data-modal-box', AddDataModalBox);

/**************************************************************************************************************/

var data = [
    // Data Prototype ::
    //
    // {
    //     key: 'Barang 1',
    //     value: 100000000
    // },
    // {
    //     key: 'Barang 2',
    //     value: 20000000
    // },
    //
];
var modal = {};

/**************************************************************************************************************/

async function editData(index, items) {

    // Get Data
    const key = items.getElementsByTagName('ion-col')[0].getElementsByTagName('ion-text')[0];
    const value = items.getElementsByTagName('ion-col')[1].getElementsByTagName('ion-text')[0];

    // Get Controller Element
    const alertController = document.querySelector('ion-alert-controller');

    // Alert Dialog Content
    const alert = await alertController.create({
        header: 'Detail Data!',
        inputs: [
            {
            name: 'key',
            type: 'text',
            value: key.innerHTML,
            placeholder: 'Nama'
            },
            {
            name: 'value',
            type: 'number',
            value: value.innerHTML.replace(/\D/g,''),
            placeholder: 'Anggaran'
            }
        ],
        buttons: [
            {
                text: 'Simpan',
                cssClass: 'primary',
                handler: updatedData => {

                    // Update Data
                    data[index].key = updatedData.key;
                    data[index].value = parseInt(updatedData.value);

                    // Store To Local Storage
                    localStorage.setItem("data", JSON.stringify(data));

                    // Reload Data
                    loadListData();
                }
            },
            {
                text: 'Hapus',
                cssClass: 'danger',
                handler: () => {

                    // Remove Data On Index ...
                    data.splice(index, 1);

                    // Store To Local Storage
                    localStorage.setItem("data", JSON.stringify(data));

                    // Reload Data
                    loadListData();
                }
            },
            {
                text: 'Batal',
                role: 'cancel',
                cssClass: 'secondary'
            }
        ]
    });

    await alert.present();
}

// Currency Rp. Formatter
function formatRupiah(angka, prefix){
    var number_string = angka.toString().replace(/[^,\d]/g, ''),

    split = number_string.split(','),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // Separate Each 3 Digit
    if(ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    if(prefix == undefined || prefix == null) return rupiah;
    else return `${prefix} ${rupiah},-`;
}

// Loading Data
async function loadListData() {

    // Initialize
    let totalValue = 0;

    // Get Data From Local Storage
    data = (JSON.parse(localStorage.getItem("data")) != null) ? JSON.parse(localStorage.getItem("data")) : [];

    // Get Element Parent & Set Empty Data
    const listData = document.getElementById('listData');

    // If Already Have Data Then Show It
    if(data.length != 0) {

        // Clear List Data
        listData.innerHTML = "";

        // Creating HTML Element & Append To Parent Inside
        for(let i=0; i<data.length; i++) {
            let ionItem = document.createElement("ion-item");
                ionItem.setAttribute('onclick', `editData(${i}, this);`);
                let ionCol1 = document.createElement("ion-col");
                    let ionText1 = document.createElement("ion-text");
                        let key = document.createTextNode(data[i].key);
                    ionText1.appendChild(key);
                ionCol1.appendChild(ionText1);
            ionItem.appendChild(ionCol1);
                let ionCol2 = document.createElement("ion-col");
                    let ionText2 = document.createElement("ion-text");
                        ionText2.setAttribute('class', 'ion-float-right');
                        let value = document.createTextNode(formatRupiah(data[i].value, 'Rp. '));
                    ionText2.appendChild(value);
                ionCol2.appendChild(ionText2);
            ionItem.appendChild(ionCol2);
            listData.appendChild(ionItem);

            // Dont Forget To Sum Amount Of Each Value
            totalValue += data[i].value;
        }
    }
    else {

        // Set Default Template Data
        listData.innerHTML = `
            <!-- Item 0 -->
            <ion-item onclick="">
                <ion-col>
                    <ion-text> Tidak ada barang. </ion-text>
                </ion-col>
                <ion-col>
                    <ion-text class="ion-float-right"> null </ion-text>
                </ion-col>
            </ion-item>
        `;
    }

    // Update Total Value
    const totalPengeluaran = document.getElementById('totalPengeluaran');
    totalPengeluaran.innerHTML = formatRupiah(totalValue, 'Rp. ');
}

// Showing Popup Modal Box
async function showAddDataModalBox() {

    // Get Controller Element
    const popoverController = document.querySelector('ion-popover-controller');

    // Set Content With Class
    const popover = await popoverController.create({
        component: 'add-data-modal-box',
        translucent: true
    });

    // Show Modal Box
    modal = popover;
    return await modal.present();
}

// When Trying To Adding A New Data
async function addNewData() {

    // Get Data
    const key = document.getElementById('key');
    const value = document.getElementById('value');

    // TextBox Input Is Null Or Empty
    if(key.value == "" || key.value == null || value.value == "" || value.value == null) {
        presentAlert('Terjadi Kesalahan!', null, 'Mohon Masukkan Nama Dan Besaran Anggaran.', ['OK']);
    }
    else {

        // Get Data, Push
        let temp = {};
        temp.key = key.value;
        temp.value = parseInt(value.value);
        data.push(temp);

        // Store To Local Storage
        localStorage.setItem("data", JSON.stringify(data));

        // Reload Data
        loadListData();

        // Clear
        key.value = "";
        value.value = "";
        presentAlert('Behasil!', null, 'Berhasil menambahkan record baru.', ['OK']);
        modal.dismiss(null);
    }
}
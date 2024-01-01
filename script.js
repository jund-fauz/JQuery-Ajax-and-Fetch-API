const table = document.getElementById('table'), month = document.getElementById('month'), city_select = document.getElementById('city')
const date = new Date()
month.selectedIndex = date.getMonth()

// AJAX dengan Fetch API
fetch('https://www.emsifa.com/api-wilayah-indonesia/api/regencies/33.json')
    .then(response => response.json())
    .then(cities => cities.forEach(city => {
        let final_city = city.name.replace('KABUPATEN ', '').toLowerCase()
        let city_text = city.name.startsWith('KAB') ? final_city[0].toUpperCase() + final_city.slice(1) : final_city[0].toUpperCase() + final_city.slice(1, 5) + final_city[5].toUpperCase() + final_city.slice(6)
        let option = document.createElement('option')
        option.text = city_text
        city_select.add(option)
    }))


function showData() {
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    // AJAX dengan JQuery
    if (city_select.value != 'Pilih kota')
        $.ajax({
            url: `http://api.aladhan.com/v1/calendarByCity/${date.getFullYear()}/${month.value}?city=${city_select.value}&country=Indonesia&method=2`,
            success: success,
            error: error
        })

}


function success(result) {
    let tanggal = 1, tableData, tableContent
    result.data.forEach(data => {
        const prayTime = ['Imsak', 'Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
        const row = document.createElement('tr')
        tableData = document.createElement('td')
        tableContent = document.createTextNode(tanggal)
        tableData.appendChild(tableContent)
        row.appendChild(tableData)
        for (const time of prayTime) {
            tableData = document.createElement('td')
            tableContent = document.createTextNode(data.timings[time].replace(' (WIB)', ''))
            tableData.appendChild(tableContent)
            row.appendChild(tableData)
        }
        table.appendChild(row)
        tanggal++
    })
}

function error() {

}
// 生成随机数字，max限制最大值，base限制最小值
function getRandom(max, base) {
    return Math.floor(Math.random() * max + (base ? base : 0));
}
// 获取随机返回区间值
function random(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getProvince() {
    const randomIndex = Math.floor(Math.random() * provinceArray.length)
    const randomElement = provinceArray[randomIndex] // 随机输出一个6位数的行政区域值
    return randomElement
}
// 根据前17位生成末位
function cnNewID(idcard) {
    var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子
    var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2]; // 校验码
    var sum = 0,
        idx;
    for (var j = 0; j < 17; j++) {
        // 对前17位数字与权值乘积求和
        sum += parseInt(idcard[j], 10) * arrExp[j];
    }
    return arrValid[sum % 11];
}

// 生成身份证号
function getIdcard(value) {
    var randomElement = getProvince() + "";
    var birthday = random(Number(2000), Number(1970)) + monthArray[random(monthArray.length - 1, 0)] + dayArray[random(dayArray.length - 1, 0)]
    let id = randomElement + birthday + ''
    // 生成前17位数字
    for (let i = 0; i < 3; i++) {
        id += Math.floor(Math.random() * 10)
    }
    // 生成最后一位校验码
    let sum = 0
    for (let i = 0; i < 17; i++) {
        sum += parseInt(id[i]) * (Math.pow(2, 17 - i) % 11)
    }
    const checksum = (12 - (sum % 11)) % 11
    if (checksum === 10) {
        id += 'X'
    } else {
        id += checksum
    }
    const result = value || id
    if (getVlue('idcardInput')) {
        insertVlue('idcard', getVlue('idcardInput'))
        getBirthday(getVlue('idcardInput').slice(6, 14))
        return getVlue('idcardInput')
    } else {
        insertVlue('idcard', result)
        getBirthday(result.slice(6, 14))
        return result
    }
}

// 生成姓名
function getName() {
    const randomFirst = Math.floor(Math.random() * familyNamesArray.length)
    const randomFirstName = familyNamesArray[randomFirst] // 随机输出一个姓
    const randomGive = Math.floor(Math.random() * givenNamesArray.length)
    const randomGivetName = givenNamesArray[randomGive] // 随机输出一个姓
    const name = randomFirstName + randomGivetName;
    if (getVlue('nameInput')) {
        insertVlue('name', getVlue('nameInput'))
    } else {
        insertVlue('name', name)
    }
}

// 生成发证机构
function getOrganization() {
    const provinceNum = getRandom(cityTree.length);
    const cityNum = getRandom(cityTree[provinceNum].city.length);
    const areaNum = getRandom(cityTree[provinceNum].city[cityNum].area.length);
    const result =
        cityTree[provinceNum].city[cityNum].name +
        "公安局" +
        cityTree[provinceNum].city[cityNum].area[areaNum].substring(0, cityTree[provinceNum].city[cityNum].area[areaNum].length - 1) +
        "分局";
    getAddress(cityTree[provinceNum].name + cityTree[provinceNum].city[cityNum].name + cityTree[provinceNum].city[cityNum].area[areaNum]);
    if (getVlue('organizationInput')) {
        insertVlue('organization', getVlue('organizationInput'))
    } else {
        insertVlue('organization', result)
    }
}

// 生成有效期限
function getExpiryDates() {
    const minYear = 2015
    const maxYear = 2020
    const randomYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear
    yearAddStr = [5, 10, 15, 20]
    const randomIndex = Math.floor(Math.random() * yearAddStr.length)
    const yearAddStrNum = yearAddStr[randomIndex]
    const endYear = randomYear + yearAddStrNum
    const result = randomYear + '.10.20-' + endYear + '.10.20'
    // insertVlue('expiryDates', result)
    if (getVlue('expiryDatesInput')) {
        insertVlue('expiryDates', getVlue('expiryDatesInput'))
    } else {
        insertVlue('expiryDates', result)
    }
}

// 生成民族
function getNation() {
    const result = nationData[getRandom(nationData.length)].name
    // insertVlue('nation', result)
    if (getVlue('nationInput')) {
        insertVlue('nation', getVlue('nationInput'))
    } else {
        insertVlue('nation', result)
    }
}

// 生成性别
function getGender() {
    const gederNum = Number(getIdcard().substr(- 2, 1))
    if (gederNum % 2 == 0) {
        result = '女'
        document.getElementById('back').className = 'back_woman'
    }
    else {
        result = '男'
        document.getElementById('back').className = 'back_male'

    }
    insertVlue('gender', result)
}

// 生成出生日期
function getBirthday(value) {
    insertVlue('year', value.slice(0, 4))
    if (value.slice(4, 5) == 0) {
        insertVlue('month', value.slice(5, 6))
        document.getElementById('month').style.left = '184px'
    } else {
        insertVlue('month', value.slice(4, 6))
        document.getElementById('month').style.left = '177px'
    }
    if (value.slice(6, 7) == 0) {
        insertVlue('day', value.slice(7, 8))
        document.getElementById('day').style.left = '237px'
    } else {
        insertVlue('day', value.slice(6, 8))
        document.getElementById('day').style.left = '230px'
    }
}

function insertVlue(key, value) {
    document.getElementById(key).innerHTML = value;
}

function getVlue(key) {
    return document.getElementById(key).value
}

function getAddress(value) {
    const addressData = ['浦玉路', '虎跑路', '凤起路', '云起路', '玉古路', '鲲鹏路', '保俶路', '三角荡路', '岳王路', '海潮路', '望江路', '秋涛路', '阔石板路', '清波路', '紫薇路', '都锦生路', '密渡桥路', '古新路', '香积寺路', '桑植路', '环城路', '解放路', '人民路', '体育场路', '中山路', '建国路', '绍兴路', '延安路', '台州路', '丽水路', '舟山东路', '浙大路', '大学路', '文一路', '文二路', '文三路']
    const result = value + addressData[getRandom(addressData.length)] + getRandom(999) + '号'
    // insertVlue('address', result)
    if (getVlue('addressInput')) {
        insertVlue('address', getVlue('addressInput'))
    } else {
        insertVlue('address', result)
    }
}

function refresh() {
    const dom = document.getElementById('idcardInput')
    getOrganization();
    getExpiryDates();
    getName();
    getIdcard(dom.value);
    getNation();
    getGender();
}



console.log('我是main.js')

getHTML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/3.html')
    request.onload = () => {//创建一个div只需要把它放到HTML里面就行
        const div = document.createElement('div')//创建div  填写DIV 内容 插入到身体里
        div.innerHTML = request.response
        document.body.appendChild(div)
    }
    request.onerror = () => { }
    request.send()
}

getJS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/2.js');
    request.onload = () => {
        const script = document.createElement('script')//创建scrip标签
        script.innerHTML = request.response//填写scrip内容
        document.body.appendChild(script)//插到里面
    }
    request.onerror = () => {

    }
    request.send()
};

getCSS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/style.css');//readyState =1 
    request.onreadystatechange = () => {
        //console.log(request.readyState)//监听一下readyState
        //下载完成不知道是成功还是失败 成功一定是2xx
        if (request.readyState === 4) {
            //console.log(request.status)//我们可以看到响应的状态码是404 那就说明把404下载完了 不是把成功页面下载完了
            if (request.status >= 200 && request.status <= 300) {//http里面 状态码是2开头的都表示成功我们只监听两百
                const style = document.createElement('style')//创建style标签
                style.innerHTML = request.response//填写style内容
                document.head.appendChild(style)//插到头里里面
            } else {
                alert('加载CSS失败')
            }

        }
    }
    request.send()//readyState =2 
};

getXML.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('get', '/4.xml');
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 20 && request.status <= 300) {
                const dom = request.responseXML
                const text = dom.getElementsByTagName('warning')[0].textContent
                console.log(text.trim())
            } else {
                alert('加载XML失败')
            }
        }
    }
    request.send()
}

getJSON.onclick = () => {

    const request = new XMLHttpRequest();
    request.open('get', '/5.json')
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            // 全新解析版本  弄一个对象  JSON.parse   就是把符合JSON语法的字符串变成对应的对象或其他东西
            console.log(request.response)
            const object = JSON.parse(request.response)
            myName.textContent = object.name
            console.log(object)
        }
    }
    request.send()
}

let n = 1;
getPage.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('get', `/page${n + 1}.json`)
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            const array = JSON.parse(request.response)//首先把这个JSON变为JS数组 ，对于这个数组，每一项插到它后面
            array.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.id;
                xxx.appendChild(li);
            });
            n += 1;
        }
    }
    request.send()
}



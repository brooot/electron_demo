const information = document.getElementById('info')
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}),\n Node.js (v${versions.node()}), \n和 Electron (v${versions.electron()})。\n staticValue：${versions.staticValue}`

const func = async () => {
  const response = await ipc.sayHello()
  console.log(response) // 打印 结果
}

func()


document.getElementById('sendMessage').addEventListener('click', () => {
  ipc.send('message-from-renderer', '我是渲染进程，你好，主进程！');
});

ipc.on('message-from-main', (event, arg) => {
  console.log(arg);  // 当主进程回复时，打印消息
});
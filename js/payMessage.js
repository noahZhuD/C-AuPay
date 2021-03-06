const mainApi = 'http://192.168.50.162:8086/api/payment/'
const getPaymentChannel = mainApi + 'finishPayment' // 支付完成接口
var paramsData = null

// 支付完成按钮
$('#pay_complete').click(function() {
  $.mobile.loading('show')
  var walletVal = $('#wallet_address').val() // 钱包地址框
  var transactionVal = $('#transaction_id').val() // 交易id框
  if (!walletVal && paramsData.type !== 'exchange') return alert('请填写支付钱包地址')
  if (!transactionVal) return alert('请填写区块链交易ID')
  $.ajax({
    type: 'POST',
    url: getPaymentChannel,
    data: {
      chainTxId: transactionVal
    },
    success: function(res) {
      $.mobile.loading('hide')
      console.log(res, '充值结束')
    },
    error: function(err) {
      $.mobile.loading('hide')
    }
  })
  // 此处可以提交数据了 然后在跳转页面
  // window.onbeforeunload = null
  // window.location.href = './paySuccess.html'
})
// 离开页面提示
window.onbeforeunload = function(e){
　　var e = window.event || e
  e.returnValue = ('如果您正在进行充值，为了您的资产安全，请勿离开此页面')
}
// 返回上一页按钮
$('#back').click(function() {
  $('#popupDialog').popup('open')
})
// 确认离开的按钮
$('#leave').click(function() {
  document.location = 'index.html'
})

// 复制地址
$('#copySite').click(function() {
  $('#depositInputImg').select()
  document.execCommand("copy")
  $("#copyOk").popup('open')
  setTimeout(function() { $("#copyOk").popup('close') }, 1000)
})
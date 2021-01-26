 <template>
     <view>
         <web-view :webview-styles="webviewStyles" src="https://h5.waimai.meituan.com/login?force=true&back_url=https%3A%2F%2Fh5.waimai.meituan.com%2Fwaimai%2Fmindex%2Fhome"></web-view>
     </view>
 </template>
 <script>
     export default {
         data() {
             return {
                 webviewStyles: {
                     progress: {
                         color: '#FF3333'
                     }
                 }
             }
         }
     }
 </script>
 <style>
 </style>

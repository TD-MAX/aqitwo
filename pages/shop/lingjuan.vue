 <template>
     <view>
         <web-view :webview-styles="webviewStyles" src="http://0quan8.com/index.php?r=index/wap"></web-view>
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
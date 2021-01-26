 <template>
     <view>
         <web-view :webview-styles="webviewStyles" src="http://chong.55.la/"></web-view>
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
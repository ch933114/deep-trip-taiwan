<template>
  <div class="relative bg-[url('/images/banner.png')] bg-cover bg-center h-[70vh] w-full">
    <div class="absolute left-0 top-0 h-[70vh] w-full bg-[black] bg-opacity-70 z-5"></div>
    <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 text-center">
      <h1 class="text-white text-[60px] mb-6">前往總部</h1>
      <h2 class="text-white text-3xl">你有故事，我有酒</h2>
    </div>
  </div>
  <div class="max-w-[1296px] mx-auto">
    <div class="flex flex-col px-2 my-12 text-center">
      <h3 class="text-xl lg:text-2xl font-bold py-4">想好好暢聊旅行經驗 ? 來拜訪深旅行總部吧!</h3>
      <div class="flex flex-col my-8 gap-2 lg:text-lg">
        <p><span class="font-bold">路線 A</span> : 從火車站搭乘計程車或騎Ubike前往。</p>
        <p><span class="font-bold">路線 B</span> : 從客運地方法院站下車，騎Ubike前往或步行前往。</p>
      </div>
      <div class="relative w-[80%] aspect-[16/9] mx-auto">
        <iframe
          src="https://www.google.com/maps/d/u/1/embed?mid=1XXlJeoXPLZmt8KZ_HM_GDM4eGbls6Oo&ehbc=2E312F"
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
    <div class="flex flex-col px-2 my-12">
      <h3 class="text-xl lg:text-2xl font-bold py-4 text-center">
        出發之前，有什麼話想先對我們說嗎 ?
      </h3>
      <div class="flex flex-col gap-2 lg:text-lg">
        <form
          @submit.prevent="submitForm"
          class="flex flex-col gap-4 mx-auto w-[80%] p-10 bg-primary-light rounded-[10px]"
        >
          <div>
            <div class="flex flex-col">
              <label for="name" class="text-primary">您的稱呼</label>
              <Field
                id="name"
                name="name"
                type="text"
                class="mt-1 p-1 block w-full rounded-md border border-primary"
              />
            </div>
            <ErrorMessage name="name" class="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label for="email" class="text-primary">電子郵件</label>
            <Field
              id="email"
              name="email"
              type="email"
              class="mt-1 p-1 block w-full rounded-md border border-primary"
            />
            <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label for="visitDate" class="text-primary">預計拜訪日期</label>
            <Field
              id="visitDate"
              name="visitDate"
              type="date"
              class="mt-1 p-1 block w-full rounded-md border border-primary"
            />
            <ErrorMessage name="visitDate" class="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label for="message" class="text-primary">對我們說的話</label>
            <Field
              id="message"
              name="message"
              as="textarea"
              rows="4"
              class="mt-1 p-1 block w-full rounded-md border border-primary"
            />
            <ErrorMessage name="message" class="text-red-500 text-sm mt-1" />
          </div>

          <div class="text-right">
            <button
              type="submit"
              class="inline-flex justify-center px-4 py-2 text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              送出留言
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useForm, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const today = new Date()
today.setHours(0, 0, 0, 0)

const schema = yup.object({
  name: yup.string().required('請輸入姓名'),
  email: yup.string().email('格式不正確').required('請輸入電子郵件'),
  message: yup.string().required('請輸入留言內容'),
  visitDate: yup.date().required('請選擇預計拜訪日期').min(today, '無法選擇過往日期'),
})

// 初始化表單
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    email: '',
    message: '',
    visitDate: '',
  },
})

// 成功送出邏輯
const onSubmit = (values, { resetForm }) => {
  console.log('留言送出：', values)
  alert('留言送出成功！')
  resetForm() // 清空表單
}

// 送出按鈕綁定的方法
const submitForm = handleSubmit(onSubmit, () => {
  alert('請完整填寫表單，並修正欄位錯誤。')
})
</script>

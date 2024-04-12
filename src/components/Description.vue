<template>
<div class="m-auto w-8/12">
    <div class="w-full px-24 py-4 mt-12">
        <label for="message" class="block capitalize text-sm font-medium leading-6 text-gray-900">
            Your text
        </label>
        <input v-model="text" @input="checkTyping()" id="description" class="w-full rounded-md py-1.5 px-5 ring-1" placeholder="Write your text here..." />

    </div>
    <div class="">
        <div class="p-6">
            <h5 class="">
                <div v-if="checkBalanced">
                    The text is balanced.
                </div>
                <div v-else>
                    The text is not balanced.
                </div>
            </h5>

        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            text: '',
            checkBalanced : true,
            timeout:null,
        };
    },
    methods: {
        checkTyping(){
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                this.validateText()
            }, 100);
        },
        validateText() {
            const text = this.text.trim();
            if (!this.isBalanced(text)) {
                this.checkBalanced = false;
            } else {
               this.checkBalanced = true;
            }
        },
        isBalanced(text) {
            const stack = [];
            const openingChars = ['(', '[', '{'];
            const closingChars = [')', ']', '}'];

            for (let char of text) {
                if (openingChars.includes(char)) {
                    stack.push(char);
                } else if (closingChars.includes(char)) {
                    const lastOpeningChar = stack.pop();
                    const matchingOpeningChar = openingChars[closingChars.indexOf(char)];
                    if (lastOpeningChar !== matchingOpeningChar) {
                        return false;
                    }
                }
            }
            return stack.length === 0;
        },
    },
};
</script>

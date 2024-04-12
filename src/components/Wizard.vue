<template>
<div class="m-auto w-8/12">
    <div class="w-full px-24 py-4 mt-12">
        <div class="relative flex items-center justify-between w-full">
            <div class="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300"></div>
            <div :style="{width:progressWidth}" class="absolute left-0 top-2/4 h-0.5 -translate-y-2/4 bg-gray-900 transition-all duration-500">
            </div>
            <div v-for="step in steps" :class="[isActive(step.step) ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900']" class="relative grid w-10 h-10 font-bold  transition-all duration-300  rounded-full place-items-center">
                <span :class="[isActive(step.step) ? 'text-gray-100' : 'text-gray-900']">{{step.icon}}</span>
                <div class="absolute -bottom-[2rem]">
                    <h6 class="text-gray-900 text-base font-semibol capitalize">
                        {{step.title}}
                    </h6>
                </div>
            </div>
        </div>

        <div class="justify-center mt-20">
            <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Step: {{steps[currentStep-1].title}}
            </h5>
            <form>
                <div v-show="1 === currentStep">
                    <label for="username" class="block capitalize text-sm font-medium leading-6 text-gray-900">
                        Username:
                    </label>
                    <div class="relative mt-2 ">
                        <input v-model="username" id="username" name="username" type="text" class="w-full rounded-md py-1.5 px-5 ring-1 ">
                    </div>
                </div>

                <div v-show="2 === currentStep">
                    <label for="email" class="block capitalize text-sm font-medium leading-6 text-gray-900">
                        Email:
                    </label>
                    <div class="relative mt-2 ">
                        <input v-model="email" id="email" name="email" type="text" class="w-full rounded-md py-1.5 px-5 ring-1 ">
                    </div>
                </div>

                <div v-show="3 === currentStep">
                    <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
                        <div class="p-6">
                            <h5 class="block mb-2 font-sans capitalize text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                review
                            </h5>
                            <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                                <table class="w-full text-left table-auto min-w-max">
                                    <tbody>
                                        <tr>
                                            <td class="p-4 border-b border-blue-gray-50">
                                                <p class="block capitalize font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    Username:
                                                </p>
                                            </td>
                                            <td class="p-4 border-b border-blue-gray-50">
                                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {{username}}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="p-4 border-b border-blue-gray-50">
                                                <p class="block capitalize font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    Email:
                                                </p>
                                            </td>
                                            <td class="p-4 border-b border-blue-gray-50">
                                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                    {{email}}
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <p v-if="errorMessage" class="flex items-center gap-1 mt-2 text-sm font-normal leading-normal text-red-700">
            {{errorMessage}}
        </p>
        <div class="flex justify-between mt-20">
            <button :disabled="prevStepDisabled" id="btn-prev" @click="prevStep()" class="rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                Prev
            </button>
            <button :disabled="nextStepDisabled" id="btn-next" @click="nextStep()" class="rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                Next
            </button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            currentStep: 1,
            username: "",
            email: "",
            steps: [{
                step: 1,
                icon: "1",
                title: "username",
            }, {
                step: 2,
                icon: "2",
                title: "email",
            }, {
                step: 3,
                icon: "3",
                title: "review",
            }],
            errorMessage: "",
        }
    },
    methods: {
        isActive(step) {
            if (step <= this.currentStep) {
                return true;
            }
            return false;
        },
        nextStep() {
            if (this.currentStep < this.steps.length) {
                this.currentStep += 1;
                this.validationStep();
            }
        },
        prevStep() {
            if (this.currentStep > 1) {
                this.currentStep -= 1;
            }
        },
        validationStep() {
            if (this.currentStep == 2) {
                if (this.username.trim() == "") {
                    this.errorMessage = "Invalid Username.";
                    return false;
                } else if (!/^[0-9a-z@$_\.-]*$/i.test(this.username)) {
                    this.errorMessage = "Invalid Username.";
                    return false;
                } else if (this.username.length < 4) {
                    this.errorMessage = "Invalid Username.";
                    return false;
                } else if (this.username.length > 25) {
                    this.errorMessage = "Invalid Username.";
                    return false;
                }
                return true;
            } else if (this.currentStep == 3) {
                if (this.email.trim() == "") {
                    this.errorMessage = "Invalid email address.";
                    return false;
                } else if (!/^(([0-9a-z$_\.-]+)@([a-z]+)(\.([a-z]{2,6}))+)*$/i.test(this.email)) {
                    this.errorMessage = "Invalid email address.";
                    return false;
                }
                return true;
            }
        }
    },
    computed: ({
        progressWidth() {
            return (this.currentStep - 1) / (this.steps.length - 1) * 100 + "%"
        },
        nextStepDisabled() {
            if (this.currentStep == this.steps.length) {
                return true
            }
            return false
        },
        prevStepDisabled() {
            if (this.currentStep == 1) {
                return true;
            }
            return false;
        }
    }),
}
</script>

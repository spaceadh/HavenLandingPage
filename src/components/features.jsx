import {
    LockClosedIcon,
    LightBulbIcon,
    UserGroupIcon,
    MapPinIcon,
    CogIcon,
    ServerIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline'

const features = [
    {
        name: 'Anonymous messaging',
        description: 'Your stories matter, and sharing them anonymously can make a significant impact. We invite you to share your experiences, helping others learn from your encounters and feel supported in their journey towards safety.',
        icon: ShieldCheckIcon,
    },

    {
        name: 'Group chats',
        description: ' Easily share your stories via our group chats system. Your input will help create a comprehensive database categorized by the type of crime, location, and incident details.',
        icon: CogIcon,
    },

    {
        name: 'Posts feature',
        description: 'Connect with others by reading our blogs and you posting to us. We are here to listen and support you. Our platform is designed to help you feel safe and supported in your journey against mental health.',
        icon: UserGroupIcon,
    },
    {
        name: 'Rachel AI',
        description: 'We leverage the power of artificial intelligence to generate personalized messages. These models analyze historical data and personal data to identify patterns and provide you with the best possible advice and support.',
        icon: LightBulbIcon,
    },
   
    {
        name: 'Tik-tok Like Videos',
        description: 'Quickly view our funny videos with our Tik-tok like videos. Our platform is designed to help you feel safe and supported in your journey against mental health.',
        icon: MapPinIcon,
    },
   

]

export default function Example() {
    return (
        <div className="relative bg-white py-16 sm:py-32 lg:py-40">
            <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
                <h2 className="text-lg font-semibold text-pink-600">Someone still cares ...</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Your Journey, against mental health, begins here.
                </p>
                <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
                Haven is a platform that provides a safe space for you to share your stories and connect with others. We are here to listen and support you. Our platform is designed to help you feel safe and supported in your journey against mental health.
                </p>
                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="pt-6">
                                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                                    <div className="-mt-6">
                                        <div>
                                            <span className="inline-flex items-center justify-center rounded-xl bg-pink-500 p-3 shadow-lg">
                                                <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                                            </span>
                                        </div>
                                        <h3 className="mt-8 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                                            {feature.name}
                                        </h3>
                                        <p className="mt-5 text-base leading-7 text-gray-600">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
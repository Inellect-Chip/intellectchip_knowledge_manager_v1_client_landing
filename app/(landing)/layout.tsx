import React from 'react'
import Header from '@/component/layouts/common/Header'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <div>
                {children}
            </div>
        </div>
    )
}

export default layout
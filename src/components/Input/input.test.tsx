import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Input, InputProps } from './input'

const defaultProps = {
    onChange: jest.fn(),
    placeholder: 'test-input'
}



describe('test Input component', () => {
    it('should render the correct default Input', () => {
        const wrapper = render(<Input {...defaultProps}/>)
        const testNode = wrapper.getByPlaceholderText('test-input')
        expect(testNode).toBeInTheDocument()
        expect(testNode).toHaveClass('lighting-input-inner')
        fireEvent.change(testNode, {target: {value: '23'}})
        expect(defaultProps.onChange).toHaveBeenCalled()
        expect(testNode.value).toEqual('23')
    })
    it('should render the disabled Input on disabled property', () => {
        const wrapper = render(<Input disabled placeholder="disabled"/>)
        const testNode = wrapper.getByPlaceholderText('disabled') as HTMLInputElement
        expect(testNode.disabled).toBeTruthy()
    })
    it('should render different input sizes on size property', () => {
        const wrapper = render(<Input size="lg" placeholder="sizes"/>)
        const testContainer = wrapper.container.querySelector('.lighting-input-wrapper')
        expect(testContainer).toHaveClass('input-size-lg')
    })
    it('should render prepand and append element on prepand/append property', () => {
        const {queryByText, container } = render(<Input placeholder="pend" prepend="https://" append=".com"/>)
        const testContainer = container.querySelector('.lighting-input-wrapper')
        expect(testContainer).toHaveClass('input-group input-group-prepend input-group-append')
        expect(queryByText('https://')).toBeInTheDocument()
        expect(queryByText('.com')).toBeInTheDocument()
    })
})
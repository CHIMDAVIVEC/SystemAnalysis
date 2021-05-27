import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

function PageFooter() {
  return (
    <div style={{ height: '100%' }}>
      <Footer
        style={{
          display: 'flex',
          height: '100%',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}
      >
        <p>
          <a href="//github.com/CHIMDAVIVEC/SystemAnalysis">Исходный код</a>{' '}
          ©ПМИ-81 Демидович Е.Ю., Муравьев М.И.
        </p>
      </Footer>
    </div>
  );
}

export default PageFooter;

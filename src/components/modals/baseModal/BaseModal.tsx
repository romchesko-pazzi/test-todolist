import React, { ReactNode } from 'react';

import './modal.scss';

export const BaseModal: React.FC<PropsType> = props => {
  const { active, setActive, children } = props;

  const closeModal = () => setActive(false); // закрыть при нажатии на затемнённую область
  const intercept = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    e.stopPropagation(); // чтобы не закрывалось при нажатии на контентную часть модалки

  return (
    <div className={active ? 'modal active' : 'modal'} onClick={closeModal}>
      <div
        className={active ? 'modal__content active' : 'modal__content'}
        onClick={intercept}
      >
        {children}
      </div>
    </div>
  );
};

type PropsType = {
  active: boolean;
  setActive: (active: boolean) => void;
  children: ReactNode;
};

import RequestKinds from 'lib/organizations/kinds';

export const Services = {
  GROCERIES: 'Groceries',
  CHILD: 'Childcare',
  PET: 'Pet care',
  EMOTIONAL: 'Emotional support',
};

export const mapServiceKindToTitle = () => ({
  [RequestKinds.GROCERY]: Services.GROCERIES,
  [RequestKinds.CHILDCARE]: Services.CHILD,
  [RequestKinds.PETCARE]: Services.PET,
  [RequestKinds.MENTALHEALTH]: Services.EMOTIONAL,
});

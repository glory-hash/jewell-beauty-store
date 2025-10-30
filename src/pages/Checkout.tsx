import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/cart-impl'
import { formatPrice } from '../utils/price'
import Toast from '../components/Toast'

// Constantes pour la livraison et le paiement
const ZONES_LIVRAISON: Record<string, number> = {
  'Yaoundé - Centre ville': 1000,
  'Yaoundé - Périphérie': 1500,
  'Douala - Centre ville': 1000,
  'Douala - Périphérie': 1500,
  'Autres villes principales': 2500,
  'Reste du pays': 3500
}

const CONTACTS_MOBILE_MONEY = {
  'MTN MoMo': { 
    service: '8711',
    support: '677 677 677',
    pattern: /^6[7-9][0-9]{7}$/
  },
  'Orange Money': {
    service: '#150*1#',
    support: '699 699 699',
    pattern: /^6[5-6][0-9]{7}$/
  }
}

type ZoneLivraison = keyof typeof ZONES_LIVRAISON

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const [method, setMethod] = useState('MTN MoMo')
  const [phone, setPhone] = useState('')
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' })
  const [zone, setZone] = useState<ZoneLivraison>('Yaoundé - Centre ville')
  const [address, setAddress] = useState('')
  const [showToast, setShowToast] = useState(false)
  const navigate = useNavigate()

  const paymentMethods = [
    'MTN MoMo',
    'Orange Money',
    'Carte (Visa/Mastercard)',
    'PayPal (international)',
    'Cash à la livraison'
  ]

  const fraisLivraison = ZONES_LIVRAISON[zone]
  const totalAvecLivraison = total + fraisLivraison

  // Les hooks/états ci-dessous sont préparés pour compléter le composant.
  // Afin d'éviter des erreurs TypeScript (noUnusedLocals) pendant le scaffolding,
  // on référence brièvement les variables non encore utilisées.
  void CONTACTS_MOBILE_MONEY
  void items
  void method
  void setMethod
  void phone
  void setPhone
  void card
  void setCard
  void zone
  void setZone
  void address
  void setAddress
  void navigate
  void paymentMethods
  void clearCart

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Paiement sécurisé</h2>
      <div className="bg-white border p-6 rounded-luxury">
        <div className="space-y-6">
          {/* Récapitulatif */}
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Sous-total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Frais de livraison</span>
              <span>{formatPrice(fraisLivraison)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>{formatPrice(totalAvecLivraison)}</span>
            </div>
          </div>

          {/* Bouton de paiement */}
          <div className="text-right">
            <button
              onClick={() => {
                // Simuler un paiement réussi
                clearCart()
                setShowToast(true)
                setTimeout(() => {
                  navigate('/')
                }, 2000)
              }}
              className="btn"
            >
              Payer {formatPrice(totalAvecLivraison)}
            </button>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message="Paiement effectué avec succès ! Redirection..."
          type="success"
          onDismiss={() => setShowToast(false)}
          duration={2000}
        />
      )}
    </main>
  )
}

import { Helmet } from 'react-helmet';
import { CheckCircle, ClipboardList, MessageCircle, Shield, User, Database, CreditCard } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      title: 'Регистрация',
      icon: <User className="h-10 w-10" />,
      description:
        'Создайте аккаунт на платформе, укажите основную информацию о себе и подтвердите свою личность. Это повысит ваш уровень доверия на платформе.',
    },
    {
      title: 'Размещение тендера или объявления',
      icon: <ClipboardList className="h-10 w-10" />,
      description:
        'Сформулируйте подробное описание работ или товара, укажите бюджет, сроки и требования. Чем детальнее будет описание, тем более точные предложения вы получите.',
    },
    {
      title: 'Получение предложений',
      icon: <Database className="h-10 w-10" />,
      description:
        'Получайте заявки от исполнителей или запросы от покупателей. Система автоматически уведомит подходящих подрядчиков о вашем тендере.',
    },
    {
      title: 'Общение и выбор',
      icon: <MessageCircle className="h-10 w-10" />,
      description:
        'Общайтесь с потенциальными исполнителями или покупателями через встроенный чат, уточняйте детали и условия сотрудничества.',
    },
    {
      title: 'Безопасная сделка',
      icon: <Shield className="h-10 w-10" />,
      description:
        'Используйте систему безопасных платежей (эскроу), которая гарантирует защиту как для заказчика, так и для исполнителя. Оплата переводится исполнителю только после подтверждения выполнения работ.',
    },
    {
      title: 'Оценка и отзывы',
      icon: <CheckCircle className="h-10 w-10" />,
      description:
        'После завершения сделки оставьте отзыв и оценку. Это поможет другим пользователям в выборе надежных партнеров и повысит рейтинг добросовестных участников платформы.',
    },
  ];

  const benefits = [
    {
      title: 'Для заказчиков',
      items: [
        'Быстрый поиск подрядчиков без посредников',
        'Конкурентные цены благодаря тендерной системе',
        'Проверенные исполнители с отзывами и рейтингом',
        'Гарантия качества через систему безопасных платежей',
      ],
    },
    {
      title: 'Для подрядчиков',
      items: [
        'Стабильный поток заказов без затрат на рекламу',
        'Прямой контакт с заказчиками без посредников',
        'Возможность создать репутацию через отзывы',
        'Защита от недобросовестных заказчиков',
      ],
    },
    {
      title: 'Для продавцов и арендодателей',
      items: [
        'Широкая аудитория потенциальных клиентов',
        'Удобная система размещения объявлений',
        'Рейтинговая система для повышения доверия',
        'Встроенные инструменты для безопасных сделок',
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Как это работает | СтройТендер</title>
        <meta
          name="description"
          content="Узнайте, как работает платформа СтройТендер для проведения строительных тендеров и размещения объявлений о продаже/аренде строительных материалов и оборудования."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-12">
            Как работает платформа СтройТендер
          </h1>

          <div className="space-y-16">
            {/* Process */}
            <section>
              <h2 className="text-2xl font-semibold mb-10 text-center">
                Процесс работы с платформой
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                  >
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 bg-blue-50 rounded-full text-primary">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-center mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-center">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <section>
              <h2 className="text-2xl font-semibold mb-10 text-center">
                Преимущества использования платформы
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                {benefits.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                  >
                    <h3 className="text-lg font-medium mb-4 text-center text-primary">
                      {category.title}
                    </h3>
                    <ul className="space-y-2">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Safety */}
            <section className="bg-gradient-to-r from-primary to-primary-dark rounded-lg shadow-lg p-8 text-white">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/4 flex justify-center">
                  <CreditCard className="h-24 w-24" />
                </div>
                <div className="md:w-3/4">
                  <h2 className="text-2xl font-semibold mb-4">
                    Безопасность сделок
                  </h2>
                  <p className="mb-4">
                    Платформа СтройТендер использует систему безопасных платежей (эскроу),
                    которая защищает обе стороны сделки:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>
                        Заказчик переводит оплату на эскроу-счет, но подрядчик получает
                        деньги только после выполнения работ
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>
                        Подрядчик гарантированно получает оплату за выполненную работу
                        независимо от дальнейших действий заказчика
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>
                        В случае спорных ситуаций платформа выступает арбитром и
                        помогает решить конфликт
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-semibold mb-8 text-center">
                Часто задаваемые вопросы
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium mb-2">
                    Сколько стоит размещение тендера или объявления?
                  </h3>
                  <p className="text-gray-600">
                    Базовое размещение тендеров и объявлений на платформе бесплатно.
                    Мы предлагаем дополнительные платные услуги для продвижения
                    вашего тендера или объявления, чтобы привлечь больше внимания.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium mb-2">
                    Как проверяются подрядчики и продавцы на платформе?
                  </h3>
                  <p className="text-gray-600">
                    Мы используем систему верификации личности и компаний, проверяем
                    юридические данные и документы. Кроме того, система рейтингов и
                    отзывов позволяет сообществу контролировать качество услуг.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium mb-2">
                    Что делать, если возник спор с исполнителем или заказчиком?
                  </h3>
                  <p className="text-gray-600">
                    В случае возникновения споров вы можете обратиться в службу поддержки
                    платформы. Наши специалисты рассмотрят ситуацию и помогут найти
                    справедливое решение. Для сделок с использованием эскроу у нас есть
                    специальная процедура арбитража.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium mb-2">
                    Как долго действует размещенное объявление или тендер?
                  </h3>
                  <p className="text-gray-600">
                    Стандартный срок размещения объявления — 30 дней. Тендеры действуют
                    до указанной в них даты завершения. Вы всегда можете продлить срок
                    действия своего объявления или тендера в личном кабинете.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
